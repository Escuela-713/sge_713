from rest_framework import generics

from .models import Movimiento
from .serializers import MovimientoSerializer


class MovimientoListCreateView(generics.ListCreateAPIView):
    queryset = Movimiento.objects.all().order_by('-fecha', '-id')
    serializer_class = MovimientoSerializer


class MovimientoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer
