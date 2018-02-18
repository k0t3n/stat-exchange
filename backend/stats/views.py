from rest_framework import generics
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView, Response

from .models import Stats, StatsUploadEvent, CurrencyPair
from .serializers import StatsUploadEventSerializer, CurrencyPairSerializer, GetStatsSerializer
from .tasks import start_parse


class StatsUploadView(APIView):
    """
    Загрузка файла
    """

    parser_classes = (MultiPartParser,)

    permission_classes = (IsAuthenticated,)

    def put(self, request):
        file = request.FILES['file']

        task = start_parse.delay(str(file))

        StatsUploadEvent.objects.create(
            task_id=task,
            file=file,
        )

        return Response(status=204)


class StatsUploadEventView(generics.ListAPIView):
    """
    Вывод ивент-загрузок
    """
    # TODO: пагинация

    # permission_classes = (IsAuthenticated,)

    queryset = StatsUploadEvent.objects.all()[:10]

    serializer_class = StatsUploadEventSerializer


class CurrencyPairsView(generics.ListAPIView):
    """
    Вывод всех пар монет
    """

    # permission_classes = IsAuthenticated

    queryset = CurrencyPair.objects.all()

    serializer_class = CurrencyPairSerializer


class StatsView(generics.GenericAPIView):
    """
    Вывод статистики по заданным параметрам
    """

    renderer_classes = (JSONRenderer,)

    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        received_data = request.data

        if received_data.get('first_currency') is None or received_data.get('last_currency') is None:
            raise ParseError('Пропущен один из параметров')

        stats_objects = Stats.objects.filter(
            currency_pair__first_currency__icontains=received_data['first_currency'],
            currency_pair__last_currency__icontains=received_data['last_currency'],
        )

        response = GetStatsSerializer(stats_objects, many=True).data

        return Response(response)
