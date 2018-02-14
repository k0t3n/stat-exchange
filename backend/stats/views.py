from rest_framework import generics
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated

from .utils import handle_uploaded_file
from .models import StatsUploadEvent
from .serializers import StatsUploadEventSerializer


class StatsUploadView(APIView):
    """
    Загрузка файла
    """

    # TODO
    parser_classes = (MultiPartParser,)

    def put(self, request, filename, format=None):
        file = request.FILES['file']
        handle_uploaded_file(file, filename)

        return Response(status=204)


class StatsUploadEventView(generics.ListAPIView):
    """
    Вывод ивент-загрузок
    """

    # TODO: пагинация
    queryset = StatsUploadEvent.objects.all()[:10]
    serializer_class = StatsUploadEventSerializer
    permission_classes = (IsAuthenticated,)

