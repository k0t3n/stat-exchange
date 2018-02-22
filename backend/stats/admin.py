from django.contrib import admin

from .models import StatsUploadEvent, StatsRecord, CurrencyPair

admin.site.register(StatsUploadEvent)
admin.site.register(StatsRecord)
admin.site.register(CurrencyPair)
