from .models import StatsUploadEvent, CurrencyPair
from rest_framework import serializers


class StatsUploadEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatsUploadEvent
        fields = ('id', 'uploaded_at', 'uploaded_records', 'status')


class CurrencyPairSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyPair
        fields = ('id', 'first_currency', 'last_currency')
