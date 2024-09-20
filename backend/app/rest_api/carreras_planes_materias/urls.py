from django.urls import path
from .views import *

urlpatterns = [
    path('carrera/', CarreraApiViewSet.as_view()),
]
