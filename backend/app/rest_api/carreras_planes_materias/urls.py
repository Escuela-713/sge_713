from django.urls import path
from .views import *

urlpatterns = [
    path('carrera/', CarreraApiViewSet.as_view()),
    path('plan/', PlanesApiView.as_view()),
    path('materia/',MateriasApiViewSet.as_view()),
]
