from rest_framework import serializers
from rest_api.models import Bien, Ingreso, Egreso


class BienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bien
        fields = '__all__'


class IngresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingreso
        fields = '__all__'


class EgresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Egreso
        fields = '__all__'
