from django.urls import path, re_path, include
from .views import StatsUploadView

urlpatterns = [
    re_path('^upload/(?P<filename>[^/]+)$', StatsUploadView.as_view()),
]
