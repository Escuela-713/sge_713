from rest_framework import generics
from gestion_usuarios.permissions import TieneRol
from .models import Movimiento
from .serializers import MovimientoSerializer


class MovimientoListCreateView(generics.ListCreateAPIView):
    permission_classes = [TieneRol("cooperadora", "directivos")]
    queryset = Movimiento.objects.all().order_by('-fecha', '-id')
    serializer_class = MovimientoSerializer 
    
class MovimientoDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [TieneRol("cooperadora", "directivos")]
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer
