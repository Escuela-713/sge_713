from rest_framework import serializers
from gestion_mesas_examenes.models import MesaExamen

class MesaExamenSerializer(serializers.ModelSerializer):
    dia = serializers.DateField(
        allow_null=False, 
        required=True
    )

    hora = serializers.TimeField(
        allow_null=False, 
        required=True
    )

    ano = serializers.IntegerField(
        allow_null=False, 
        min_value=1, 
        max_value=7
    )

    profesor_titular = serializers.CharField(
        min_length=10, 
        max_length=200,
        allow_null=False,
        allow_blank=False, 
        required=True
    )

    profesor_primer_vocal = serializers.CharField(
        min_length=10, 
        max_length=200, 
        allow_null=False, 
        allow_blank=False, 
        required=True
    )

    profesor_segundo_vocal = serializers.CharField(
        min_length=10,
        max_length=200,
        allow_null=False,
        allow_blank=False,
        required=True
    )

    # Estos últimos 2 campos van a transformar la id de la materia y la carrera a su respectivo nombre en cada caso para en el JSON final devolver directamente la materia y la carrera y no el id de c/u.
    materia = serializers.SlugRelatedField(
        source='id_materia', 
        read_only=True,
        slug_field='nombre'
    )
    
    carrera = serializers.SlugRelatedField(
        source='id_carrera',
        read_only=True,
        slug_field='nombre'
    )   

    # Y en Meta en vez de poner __all__ para seleccionar todos los campos, escribimos los mismos manualmente, agregando al final los campos personalizados (carrera y materia) para evitar que el serializer devuelva las ids como antes aclaramos.
    class Meta:
        model = MesaExamen
        fields = [
            'id_mesa_examen', 
            'dia', 
            'hora', 
            'ano', 
            'profesor_titular', 
            'profesor_primer_vocal', 
            'profesor_segundo_vocal', 
            'ruta_al_examen_model',
            'materia',
            'carrera' 
        ]

