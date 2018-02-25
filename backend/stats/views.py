from celery import chain
from celery import uuid
from rest_framework import generics
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView, Response

from .models import StatsRecord, StatsUploadEvent, CurrencyPair
from .serializers import StatsUploadEventSerializer, CurrencyPairSerializer, GetStatsSerializer
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


class StatsView(generics.GenericAPIView):
    """
    Вывод статистики по заданным параметрам
    """

    renderer_classes = (JSONRenderer,)

    # permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        received_data = request.data

        if received_data.get('first_currency') is None or received_data.get('last_currency') is None:
            raise ParseError('Пропущен один из параметров')

        stats_objects = StatsRecord.objects.filter(
            currency_pair__first_currency__icontains=received_data['first_currency'],
            currency_pair__last_currency__icontains=received_data['last_currency'],
        )

        response = GetStatsSerializer(stats_objects, many=True).data

        return Response(response)
