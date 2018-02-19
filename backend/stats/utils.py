import os
import uuid

from django.conf import settings


def save_uploaded_file(file):
    ext = str(file).split('.')[-1]
    filename = '%s.%s' % (str(uuid.uuid4()), ext)

    file_path = os.path.join(settings.BASE_DIR, settings.UPLOAD_DIR, filename)

    with open(file_path, 'wb+') as destination:
        for chunk in file:
            destination.write(chunk)

    return file_path
