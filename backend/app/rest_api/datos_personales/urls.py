from django.urls import path
from .views import *

urlpatterns = [
   
    path('alumnos-filtrado/', AlumnosFiltrado.as_view()),
    path('filtro/', Filtro.as_view()),
]
