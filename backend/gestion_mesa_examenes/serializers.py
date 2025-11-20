from rest_framework import serializers
from .models import MesasExamenes
from .models import Profesores
from .models import Modalidades
from gestion_datos_personales.models import Alumno



from rest_framework import serializers
from .models import MesasExamenes

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


   
    class Meta:
        model = MesasExamenes
        fields = '__all__'