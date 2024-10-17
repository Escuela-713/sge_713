from django.urls import path
from .views import *

urlpatterns = [
    path('carrera/', CarreraApiViewSet.as_view()),
    path('plan/', PlanesApiView.as_view()),
    path('alumnos-filtrado/', AlumnosFiltrado.as_view()),
]
