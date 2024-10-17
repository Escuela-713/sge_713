from django.urls import path
from .views import *

urlpatterns = [
    path('instancia/', InstanciaApiViewSet.as_view()),
]

