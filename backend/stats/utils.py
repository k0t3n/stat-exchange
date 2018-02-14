import os
from core.settings import BASE_DIR, UPLOAD_DIR


def handle_uploaded_file(file, filename):
    with open(os.path.join(BASE_DIR, UPLOAD_DIR, filename), 'wb+') as destination:
        for chunk in file:
            destination.write(chunk)
