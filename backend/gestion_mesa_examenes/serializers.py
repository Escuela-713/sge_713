from rest_framework import serializers
from .models import MesasExamenes

class MesasExamenesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MesasExamenes
        fields = '__all__'

