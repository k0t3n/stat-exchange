from rest_framework import generics
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated

from .utils import handle_uploaded_file
from .tasks import start_parse
from .models import Stats, StatsUploadEvent, CurrencyPair
from .serializers import StatsUploadEventSerializer, CurrencyPairSerializer, StatsSerializer


class StatsUploadView(APIView):
    """
    Загрузка файла
    """

    parser_classes = (MultiPartParser,)

    # permission_classes = IsAuthenticated

    def put(self, request, filename, format=None):
        file = request.FILES['file']
        handle_uploaded_file(file, filename)  # сохраняем файл

        task = start_parse.delay(filename)

        StatsUploadEvent.objects.create(
            task_id=task,
            filename=filename,
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


class AllCurrenciesView(APIView):
    """
    Вывод всех уникальных монеток
    """

    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        data = []
        currency_pairs = CurrencyPair.objects.all()
        for pair in currency_pairs:
            data.append(pair.first_currency)
            data.append(pair.last_currency)

        data = set(data)

        return Response(data)


class StatsView(APIView):
    """
    Вывод статистики по заданным параметрам
    """

    renderer_classes = (JSONRenderer,)

    # permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        received_data = request.data
        stats_objects = Stats.objects.filter(
            currency_pair=CurrencyPair.objects.get(
                first_currency=received_data['first_currency'],
                last_currency=received_data['last_currency'],
            )
        )

        response = StatsSerializer(stats_objects, many=True).data

        return Response(response)
