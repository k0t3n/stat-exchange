from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView, Response

from .utils import handle_uploaded_file


class StatsUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def put(self, request, filename, format=None):
        file = request.FILES['file']
        handle_uploaded_file(file, filename)

        return Response(status=204)
