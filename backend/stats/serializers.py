from rest_framework import serializers

from .fields import CurrencyPairField
from .models import StatsUploadEvent, CurrencyPair, TradeProfit


class StatsUploadEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatsUploadEvent
        fields = ('id', 'uploaded_at', 'exchange', 'parse_status', 'update_profit_status', 'uploaded_records')


class CurrencyPairSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyPair
        fields = ('id', 'first_currency', 'last_currency')


class TradeProfitSerializer(serializers.ModelSerializer):
    currency_pair = CurrencyPairField()

    class Meta:
        model = TradeProfit
        fields = ('currency_pair', 'id', 'profit', 'date',)


class Top10TradesCountSerializer(serializers.ModelSerializer):
    trades_count = serializers.SerializerMethodField()

    def get_trades_count(self, obj):
        return obj.trade_profit.count()

    class Meta:
        model = CurrencyPair
        fields = ('first_currency', 'last_currency', 'trades_count')


class Top10TradesProfitSerializer(serializers.ModelSerializer):
    trades_profit = serializers.SerializerMethodField()

    def get_trades_profit(self, obj):
        return obj.trades_profit

    class Meta:
        model = CurrencyPair
        fields = ('first_currency', 'last_currency', 'trades_profit')
