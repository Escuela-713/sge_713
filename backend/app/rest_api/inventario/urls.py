from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BienViewSet, IngresoViewSet, EgresoViewSet

router = DefaultRouter()
router.register(r'bienes', BienViewSet, basename='bien')
router.register(r'ingresos', IngresoViewSet, basename='ingreso')
router.register(r'egresos', EgresoViewSet, basename='egreso')

urlpatterns = [
    path('', include(router.urls)),
]
