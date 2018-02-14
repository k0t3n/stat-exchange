import os
from django.shortcuts import render
from core.settings import BASE_DIR, UPLOAD_DIR
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.views import APIView, Response


class StatsUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def put(self, request, filename, format=None):
        file = request.FILES['file']
        handle_uploaded_file(file, filename)

        return Response(status=204)


def handle_uploaded_file(file, filename):
    with open(os.path.join(BASE_DIR, UPLOAD_DIR, filename), 'wb+') as destination:
        for chunk in file:
            destination.write(chunk)
