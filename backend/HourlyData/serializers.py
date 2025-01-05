from rest_framework import serializers
from api.models import HourlyData

class HourlyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HourlyData
        fields = '__all__'  # Incluye todos los campos del modelo
