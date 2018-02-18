import os
import uuid

from core.settings import BASE_DIR, UPLOAD_DIR


def upload_to(instance, filename):
    """
    Returns path to upload file as @string
    @string: app_name/model_name/4_uuid4_symbols/uuid4.ext
    """
    ext = filename.split('.')[-1]
    filename = '%s.%s' % (str(uuid.uuid4()), ext)
    basedir = os.path.join(BASE_DIR, UPLOAD_DIR)
    return os.path.join(basedir, filename)
