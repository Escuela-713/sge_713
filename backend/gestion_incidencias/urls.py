from sys import path
from django.urls import path
from .views import CrearIncidenciaView, IncidenciasPendientesView

urlpatterns = [
    path('incidencias/crear/', CrearIncidenciaView.as_view(), name='crear_incidencia'),
    path('incidencias/pendientes/', IncidenciasPendientesView.as_view(), name='incidencias_pendientes'),
]