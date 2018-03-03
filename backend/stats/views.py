from celery import chain
from celery import uuid
from django.db.models import Count, Sum
from rest_framework import generics
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView, Response

from .models import StatsUploadEvent, CurrencyPair, TradeProfit
from .serializers import StatsUploadEventSerializer, CurrencyPairSerializer, TradeProfitSerializer, \
    Top10TradesCountSerializer, Top10TradesProfitSerializer
from .tasks import ParsePoloniexStatsTask, ParseBinanceStatsTask, TradeProfitRecalculationTask
from .utils import save_uploaded_file


class StatsUploadView(APIView):
    """
    Загрузка файла и запуск парсинга + обновления профита
    """

    parser_classes = (MultiPartParser,)

    permission_classes = (IsAuthenticated,)

    def put(self, request):
        received_data = request.data

        if received_data.get('file') is None or received_data.get('exchange') is None:
            raise ParseError('Пропущен один из параметров!')

        file = save_uploaded_file(request.FILES['file'])
        request_exchange = received_data['exchange'].lower()

        exchanges = [item[0] for item in StatsUploadEvent.EXCHANGES]

        if request_exchange not in exchanges:
            raise ParseError('Параметр exchange невалиден!')

        parse_task_id, update_profit_task_id = uuid(), uuid()

        StatsUploadEvent.objects.create(
            parse_task_id=parse_task_id,
            update_profit_task_id=update_profit_task_id,
            exchange=request_exchange,
            file=file,
            uploaded_by=request.user
        )

        if request_exchange == 'poloniex':
            task = chain(
                ParsePoloniexStatsTask().subtask(
                    kwargs={
                        'file': file,
                        'task_id': parse_task_id,
                    },
                    task_id=parse_task_id,
                ),
                TradeProfitRecalculationTask().subtask(
                    kwargs={
                        'task_id': update_profit_task_id,
                    },
                    task_id=update_profit_task_id,
                )
            ).apply_async()

        elif request_exchange == 'bittrex':
            raise ParseError('Парсер Bittrex в разработке!')

            # task = chain(
            #     ParseBittrexStatsTask().subtask(
            #         kwargs={
            #             'file': file,
            #             'task_id': parse_task_id,
            #         },
            #         task_id=parse_task_id,
            #     ),
            #     TradeProfitRecalculationTask().subtask(
            #         kwargs={
            #             'task_id': update_profit_task_id,
            #         },
            #         task_id=update_profit_task_id,
            #     )
            # ).apply_async()

        elif request_exchange == 'binance':
            # raise ParseError('Парсер Binance в разработке!')

            task = chain(
                ParseBinanceStatsTask().subtask(
                    kwargs={
                        'file': file,
                        'task_id': parse_task_id,
                    },
                    task_id=parse_task_id,
                ),
                TradeProfitRecalculationTask().subtask(
                    kwargs={
                        'task_id': update_profit_task_id,
                    },
                    task_id=update_profit_task_id,
                )
            ).apply_async()

        return Response('ok', status=204)


class StatsUploadEventView(generics.ListAPIView):
    """
    Вывод ивент-загрузок
    """

    permission_classes = (IsAuthenticated,)

    queryset = StatsUploadEvent.objects.order_by('-uploaded_at')[:3]

    serializer_class = StatsUploadEventSerializer


class CurrencyPairsView(generics.ListAPIView):
    """
    Вывод всех пар монет
    """

    permission_classes = (IsAuthenticated,)

    queryset = CurrencyPair.objects.all()

    serializer_class = CurrencyPairSerializer


class TradeProfitView(generics.GenericAPIView):
    """
    Вывод профита по определенной паре
    """

    renderer_classes = (JSONRenderer,)

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        received_data = request.data
        user = request.user

        first_currency = received_data.get('first_currency')
        last_currency = received_data.get('last_currency')

        if first_currency is None or last_currency is None:
            raise ParseError('Пропущен один из параметров')

        queryset = TradeProfit.objects.filter(
            owner=user,
            currency_pair__first_currency=first_currency,
            currency_pair__last_currency=last_currency,
        )

        response = TradeProfitSerializer(queryset, many=True).data

        return Response(response)


class Top10TradesCount(generics.GenericAPIView):
    """
    Топ 10 пар по количеству сделок
    """

    renderer_classes = (JSONRenderer,)

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        queryset = CurrencyPair.objects.filter(
            trade_profit__owner=user
        ).annotate(
            num_tradeprofit=Count('trade_profit')
        ).order_by(
            '-num_tradeprofit'
        )[:10]

        response = Top10TradesCountSerializer(queryset, many=True).data

        return Response(response)


class Top10TradesProfit(generics.GenericAPIView):
    """
    Топ 10 пар по общему профиту
    """

    renderer_classes = (JSONRenderer,)

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        queryset = CurrencyPair.objects.filter(
            trade_profit__owner=user,
        ).annotate(
            trades_profit=Sum('trade_profit__profit')
        ).order_by(
            '-trades_profit'
        )[:10]

        response = Top10TradesProfitSerializer(queryset, many=True).data

        return Response(response)
