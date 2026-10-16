from django.urls import path

from .views import MovimientoDetailView, MovimientoListCreateView


urlpatterns = [
    path('cooperadora/movimientos/', MovimientoListCreateView.as_view(), name='movimientos'),
    path('cooperadora/movimientos/<int:pk>/', MovimientoDetailView.as_view(), name='movimiento-detail'),
]