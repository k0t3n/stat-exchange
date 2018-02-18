from django.urls import path

from .views import *

urlpatterns = [
    path('upload', StatsUploadView.as_view(), name='stats-upload'),
    path('getStats', StatsView.as_view(), name='get-stats'),
    path('getUploadEvents', StatsUploadEventView.as_view(), name='stats-upload-events'),
    path('getCurrencyPairs', CurrencyPairsView.as_view(), name='get-currency-pairs'),
]
