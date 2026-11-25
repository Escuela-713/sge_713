from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from gestion_usuarios.permissions import TieneRol

from .models import Bienes
from .serializers import BienesSerializer


class CrearBienView(APIView):
    """
    HU1 - Endpoint para registrar un bien en el inventario.
    POST /api/v1/inventario/bienes/crear/
    """

    permission_classes = [TieneRol("directivos")]

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


class BienesListView(generics.ListAPIView):
    """GET /api/v1/inventario/bienes/ - listado de bienes."""

    permission_classes = [TieneRol("directivos")]
    queryset = Bienes.objects.order_by("id_bien")
    serializer_class = BienesSerializer


class BienDetailView(generics.RetrieveUpdateDestroyAPIView):
    """GET / PUT / PATCH / DELETE /api/v1/inventario/bienes/<id>/"""

    permission_classes = [TieneRol("directivos")]
    queryset = Bienes.objects.all()
    serializer_class = BienesSerializer