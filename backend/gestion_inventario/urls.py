from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import (
    BienesViewSet, CategoriaViewSet, EstadosView, ReporteBienesView,
    ReporteMovimientosView, UbicacionViewSet,
)

router = SimpleRouter()
router.register('inventario/bienes', BienesViewSet, basename='bienes')
router.register('inventario/categorias', CategoriaViewSet, basename='categorias')
router.register('inventario/ubicaciones', UbicacionViewSet, basename='ubicaciones')

urlpatterns = [
    # Ruta anterior (HU1), se mantiene para no romper el frontend actual.
    # Tiene que ir antes del router.
    path('inventario/bienes/crear/', BienesViewSet.as_view({'post': 'create'}), name='crear_bien'),
    path('inventario/estados/', EstadosView.as_view(), name='estados'),
    path('inventario/reportes/bienes/', ReporteBienesView.as_view(), name='reporte_bienes'),
    path('inventario/reportes/movimientos/', ReporteMovimientosView.as_view(), name='reporte_movimientos'),
    path('', include(router.urls)),
]
