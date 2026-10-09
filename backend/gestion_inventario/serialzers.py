from rest_framework import serializers
from .models import Bienes


class BienesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bienes
        fields = ['id_bien', 'nombre', 'categoria', 'cantidad', 'estado', 'descripcion', 'ubicacion', 'prestado']