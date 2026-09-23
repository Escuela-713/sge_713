from rest_framework import serializers
from gestion_carrera_planes_materias.models import Carrera, Plan, Materia, validar_lista_de_anos

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = '__all__'

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

class MateriaSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(min_length=3, max_length=200, allow_null=False, required=True)
    ano = serializers.JSONField(validators=[validar_lista_de_anos])
    minutos_catedra_semanales = serializers.IntegerField(allow_null=False, required=True)
    minutos_reloj_anuales = serializers.IntegerField(allow_null=False, required=True)
    descripcion = serializers.CharField(min_length=10, max_length=400, allow_null=False, required=True)

    class Meta:
        model = Materia
        fields = '__all__'
