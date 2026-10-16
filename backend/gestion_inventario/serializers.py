from rest_framework import serializers
from .models import Bienes


class BienesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bienes
        fields = '__all__'
        read_only_fields = ['id_bien']