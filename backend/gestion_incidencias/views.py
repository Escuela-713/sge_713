from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Incidencias
from .serializer import IncidenciasSerializer

class CrearIncidenciaView(APIView):
    def post(self, request):
        serializer = IncidenciasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidenciasPendientesView(APIView):
    def get(self, request):
        pendientes = Incidencias.objects.filter(estado__iexact='pendiente')
        serializer = IncidenciasSerializer(pendientes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
