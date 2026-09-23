from rest_framework import serializers

from .models import Movimiento


class MovimientoSerializer(serializers.ModelSerializer):
    motivo = serializers.CharField(source='descripcion', required=False, write_only=True)

    class Meta:
        model = Movimiento
        fields = (
            'id',
            'fecha',
            'tipo',
            'monto',
            'origen',
            'destino',
            'descripcion',
            'motivo',
        )
        read_only_fields = ('id',)