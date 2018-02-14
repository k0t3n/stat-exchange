from django.urls import path, re_path
from .views import StatsUploadView, StatsUploadEventView

urlpatterns = [
    re_path('^upload/(?P<filename>[^/]+)$', StatsUploadView.as_view(), name='stats-upload'),
    re_path('^getUploadEvents', StatsUploadEventView.as_view(), name='stats-upload-events'),
]
