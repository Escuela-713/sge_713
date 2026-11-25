from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Incidencias
from .serializer import IncidenciasSerializer
from rest_framework.permissions import IsAuthenticated
from gestion_usuarios.permissions import TieneRol





class CrearIncidenciaView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = IncidenciasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IncidenciasPendientesView(APIView):
    permission_classes = [TieneRol("directivos", "preceptor_pot")]
    def get(self, request):
        pendientes = Incidencias.objects.filter(estado='pendiente')
        resultado = []

        for incidencia in pendientes:
            resultado.append({
                'id_incidencia': incidencia.id_incidencia,
                'fecha': incidencia.fecha,
                'asunto': incidencia.asunto,
                'estado': incidencia.estado,
                'descripcion': incidencia.descripcion,
                'prioridad': incidencia.prioridad,
                'tipo': incidencia.id_tipo.nombre  # ← aquí accedés al nombre del tipo
            })

        return Response(resultado)
