from rest_framework import serializers

from .fields import CurrencyPairField
from .models import StatsUploadEvent, CurrencyPair, StatsRecord


class StatsUploadEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatsUploadEvent
        fields = ('id', 'uploaded_at', 'uploaded_records', 'status')


class CurrencyPairSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyPair
        fields = ('id', 'first_currency', 'last_currency')


class GetStatsSerializer(serializers.ModelSerializer):
    currency_pair = CurrencyPairField()

    class Meta:
        model = StatsRecord
        fields = '__all__'
