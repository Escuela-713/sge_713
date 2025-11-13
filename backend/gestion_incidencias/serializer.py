from rest_framework import serializers
from models import Incidencias

class IncidenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incidencias
        fields = '__all__'  