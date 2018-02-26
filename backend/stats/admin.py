from django.contrib import admin

from .models import StatsUploadEvent, StatsRecord, CurrencyPair, TradeProfit

admin.site.register(StatsUploadEvent)
admin.site.register(StatsRecord)
admin.site.register(CurrencyPair)
admin.site.register(TradeProfit)
