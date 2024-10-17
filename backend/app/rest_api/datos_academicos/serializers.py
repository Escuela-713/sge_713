from rest_framework import serializers
from rest_api.models import Instancia

class InstanciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instancia
        fields = '__all__'


