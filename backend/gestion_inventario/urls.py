from django.urls import path
from .views import CrearBienView

urlpatterns = [
    path('inventario/bienes/crear/', CrearBienView.as_view(), name='crear_bien'),
]