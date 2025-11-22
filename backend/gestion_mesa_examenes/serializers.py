from rest_framework import serializers
from .models import MesasExamenes, Profesores, Modalidades
from gestion_datos_personales.models import Alumno


class MesasExamenesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MesasExamenes
        fields = '__all__'
        extra_kwargs = {
            'id_profesores': {'required': False, 'allow_null': True},
            'id_modalidades': {'required': False, 'allow_null': True},
            'id_materias': {'required': False, 'allow_null': True},
            'id_alumno': {'required': False, 'allow_null': True},
        }


class ProfesoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesores
        fields = '__all__'


class ModalidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidades
        fields = '__all__'


class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = '__all__'
