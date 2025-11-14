from rest_framework import serializers
from .models import MesasExamenes
from .models import Profesores
from .models import Modalidades
from gestion_datos_personales.models import Alumno



class ModalidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidades 
        fields = '__all__'

class ProfesoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesores
        fields = '__all__'

class MesasExamenesSerializer(serializers.ModelSerializer):
    profesor = ProfesoresSerializer()
    modalidad = ModalidadesSerializer()
   
    class Meta:
        model = MesasExamenes
        fields = '__all__'