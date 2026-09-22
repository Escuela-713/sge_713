from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Bienes
from .serializers import BienesSerializer


class CrearBienView(APIView):
    """
    HU1 - Endpoint para registrar un bien en el inventario.
    POST /api/inventario/bienes/crear/
    """

    def post(self, request):
        serializer = BienesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    'message': 'Bien registrado exitosamente',
                    'data': serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)