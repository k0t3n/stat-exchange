from django.contrib import admin
from .models import StatsUploadEvent, Stats, CurrencyPair

admin.site.register(StatsUploadEvent)
admin.site.register(Stats)
admin.site.register(CurrencyPair)
