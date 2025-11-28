from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_api.models import Bien, Ingreso, Egreso
from .serializers import BienSerializer, IngresoSerializer, EgresoSerializer


class BienViewSet(viewsets.ModelViewSet):
    queryset = Bien.objects.all()
    serializer_class = BienSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'codigo', 'ubicacion', 'estado']
    ordering_fields = ['nombre', 'codigo', 'fecha_creacion']
    ordering = ['-fecha_creacion']

    @action(detail=True, methods=['get'])
    def movimientos(self, request, pk=None):
        """Obtener ingresos y egresos de un bien"""
        bien = self.get_object()
        ingresos = Ingreso.objects.filter(id_bien=bien)
        egresos = Egreso.objects.filter(id_bien=bien)
        
        data = {
            'bien_id': bien.id_bien,
            'bien_nombre': bien.nombre,
            'cantidad_actual': bien.cantidad,
            'ingresos': IngresoSerializer(ingresos, many=True).data,
            'egresos': EgresoSerializer(egresos, many=True).data,
        }
        return Response(data)


class IngresoViewSet(viewsets.ModelViewSet):
    queryset = Ingreso.objects.all()
    serializer_class = IngresoSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['-fecha']

    def perform_create(self, serializer):
        """Al crear un ingreso, aumentar cantidad del bien"""
        ingreso = serializer.save()
        bien = ingreso.id_bien
        bien.cantidad += ingreso.cantidad
        bien.save()


class EgresoViewSet(viewsets.ModelViewSet):
    queryset = Egreso.objects.all()
    serializer_class = EgresoSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['-fecha']

    def perform_create(self, serializer):
        """Al crear un egreso, disminuir cantidad del bien"""
        egreso = serializer.save()
        bien = egreso.id_bien
        bien.cantidad -= egreso.cantidad
        bien.save()
