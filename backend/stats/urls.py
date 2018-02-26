from django.urls import path

from .views import *

urlpatterns = [
    path('upload', StatsUploadView.as_view(), name='stats-upload'),
    path('getTradeProfit', TradeProfitView.as_view(), name='get-trade-profit'),
    path('getTop10TradesCount', Top10TradesCount.as_view(), name='get-top10-trades-count'),
    path('getTop10TradesProfit', Top10TradesProfit.as_view(), name='get-top10-trades-profit'),
    path('getUploadEvents', StatsUploadEventView.as_view(), name='stats-upload-events'),
    path('getCurrencyPairs', CurrencyPairsView.as_view(), name='get-currency-pairs'),
]
