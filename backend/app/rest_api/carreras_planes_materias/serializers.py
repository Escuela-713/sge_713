from rest_framework import serializers
from rest_api.models import Carrera,Plan,Alumno,Curso,Carrera

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = '__all__'

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'
class ALumnosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
    
class CareraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = '__all__'        
