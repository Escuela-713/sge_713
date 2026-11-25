from django.urls import path
from .views import BienDetailView, BienesListView, CrearBienView

urlpatterns = [
    path('inventario/bienes/', BienesListView.as_view(), name='listar_bienes'),
    path('inventario/bienes/<int:pk>/', BienDetailView.as_view(), name='detalle_bien'),
    path('inventario/bienes/crear/', CrearBienView.as_view(), name='crear_bien'),
]