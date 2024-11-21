from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_api.datos_personales.serializers import *
from rest_api.models import *

class AlumnosFiltrado(APIView):
    def get(self, request):
        alumno = Alumno.objects.all()
        return Response({"hackedado":"lolas" })
    
class Filtro(APIView):
    def get(self, request):
        cursos = CursoSerializer(Curso.objects.all(), many=True).data
        modalidades = CarreraSerializer(Carrera.objects.all(), many=True).data
        resultado = {}
        for modalidad in modalidades:
            nombre_modalidad = modalidad['nombre']
            resultado[nombre_modalidad] = {'curso': []} 
            for curso in cursos:
                print(nombre_modalidad)
                if nombre_modalidad != "ETP" and curso['anio'] == 7:
                    continue
                resultado[nombre_modalidad]['curso'].append({
                    'anio': curso['anio'],
                    'division': curso['division']                    })
        respuesta_final = [{nombre: datos} for nombre, datos in resultado.items()]
        return Response(respuesta_final)
