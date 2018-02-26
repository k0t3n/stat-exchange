from celery import chain
from celery import uuid
from django.db.models import Count
from rest_framework import generics
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView, Response

from .models import StatsUploadEvent, CurrencyPair, TradeProfit
from .serializers import StatsUploadEventSerializer, CurrencyPairSerializer, TradeProfitSerializer, \
    Top10TradesCountSerializer
from .tasks import ParsePoloniexStatsTask, TradeProfitRecalculationTask
from .utils import save_uploaded_file


class StatsUploadView(APIView):
    """
    Загрузка файла
    """

    parser_classes = (MultiPartParser,)

    permission_classes = (IsAuthenticated,)

    def put(self, request):
        received_data = request.data
        if request.FILES.get('file') is None or received_data.get('exchange') is None:
            raise ParseError('Пропущен один из параметров!')

        file = save_uploaded_file(request.FILES['file'])
        exchange = received_data['exchange']

        # if exchange == 'poloniex':
        #     task = chain(ParsePoloniexStatsTask().s(file), TradeProfitRecalculationTask().s())
        #
        # elif exchange == 'bittrex':
        #     task = chain(ParseBittrexStatsTask.s(file), TradeProfitRecalculationTask().s())
        #
        # elif exchange == 'binance':
        #     task = chain(ParseBinanceStatsTask.s(file), TradeProfitRecalculationTask().s())
        #
        # else:
        #     raise ParseError('Параметр exchange невалиден!')

        parse_task_id = uuid()
        update_profit_task_id = uuid()

        StatsUploadEvent.objects.create(
            parse_task_id=parse_task_id,
            update_profit_task_id=update_profit_task_id,
            exchange=exchange,
            file=file,
            uploaded_by=request.user
        )

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

        print(parse_task_id, update_profit_task_id, task, task.parent)

        return Response('ok', status=204)


class StatsUploadEventView(generics.ListAPIView):
    """
    Вывод ивент-загрузок
    """

    permission_classes = (IsAuthenticated,)

    queryset = StatsUploadEvent.objects.all()[:10]

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

        profit = TradeProfit.objects.filter(
            owner=user,
            currency_pair__first_currency=first_currency,
            currency_pair__last_currency=last_currency,
        )

        response = TradeProfitSerializer(profit, many=True).data

        return Response(response)


class Top10TradesCount(generics.GenericAPIView):
    """
    Топ 10 пар по профиту
    """

    renderer_classes = (JSONRenderer,)

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user

        queryset = CurrencyPair.objects.annotate(
            num_tradeprofit=Count('trade_profit')
        ).filter(
            trade_profit__owner=user
        ).order_by(
            '-num_tradeprofit'
        )[:10]

        response = Top10TradesCountSerializer(queryset, many=True).data

        return Response(response)
