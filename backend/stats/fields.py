from rest_framework import serializers


class CurrencyPairField(serializers.Field):

    def to_representation(self, obj):
        response = {
            'first_currency': obj.first_currency,
            'last_currency': obj.last_currency
        }
        return response

    def to_internal_value(self, data):
        response = {
            'first_currency': data['first_currency'],
            'last_currency': data['last_currency']
        }
        return response
