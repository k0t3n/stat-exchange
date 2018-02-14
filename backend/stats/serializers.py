from .models import StatsUploadEvent
from rest_framework import serializers


class StatsUploadEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatsUploadEvent
        fields = ('id', 'uploaded_at', 'uploaded_records', 'status')