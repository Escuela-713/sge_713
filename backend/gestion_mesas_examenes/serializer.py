from rest_framework import serializers
from gestion_mesas_examenes.models import MesaExamen

class MesaExamenSerializer(serializers.ModelSerializer):
    dia = serializers.DateField(allow_null=False, required=True)
    hora = serializers.TimeField(allow_null=False, required=True)
    profesor_titular = serializers.CharField(min_length=10, max_length=200, allow_null=False, allow_blank=False, required=True)
    profesor_primer_vocal = serializers.CharField(min_length=10, max_length=200, allow_null=False, allow_blank=False, required=True)
    profesor_segundo_vocal = serializers.CharField(min_length=10, max_length=200, allow_null=False, allow_blank=False, required=True)

    class Meta:
        model = MesaExamen
        fields = '__all__'

