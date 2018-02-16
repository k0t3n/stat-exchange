from rest_framework import serializers
from .fields import CurrencyPairField
from .models import StatsUploadEvent, CurrencyPair, Stats


class StatsUploadEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatsUploadEvent
        fields = ('id', 'uploaded_at', 'uploaded_records', 'status')


class CurrencyPairSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyPair
        fields = ('id', 'first_currency', 'last_currency')


class StatsSerializer(serializers.Serializer):
    type = serializers.CharField(
        max_length=5,
    )

    currency_pair = CurrencyPairField()

    datetime = serializers.DateTimeField()

    price = serializers.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
    )

    amount = serializers.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
    )

    total = serializers.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
    )

    fee = serializers.DecimalField(
        max_digits=5, decimal_places=2,  # <100
    )

    order = serializers.IntegerField()

    base_total_less_fee = serializers.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
    )

    quote_total_less_fee = serializers.DecimalField(
        max_digits=17, decimal_places=8,  # <1 milliard
    )
