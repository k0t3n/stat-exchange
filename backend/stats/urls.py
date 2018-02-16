from django.urls import path, re_path
from .views import *

urlpatterns = [
    re_path('^upload/(?P<filename>[^/]+)$', StatsUploadView.as_view(), name='stats-upload'),
    path('getStats', StatsView.as_view(), name='get-stats'),
    path('getUploadEvents', StatsUploadEventView.as_view(), name='stats-upload-events'),
    path('getCurrencyPairs', CurrencyPairsView.as_view(), name='get-currency-pairs'),
    path('getAllCurrencies', AllCurrenciesView.as_view(), name='all-currencies'),
]
