<<<<<<< HEAD
from django.urls import path
from .views import CrearBienView

urlpatterns = [
    path('inventario/bienes/crear/', CrearBienView.as_view(), name='crear_bien'),
=======
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BienesViewSet

router = DefaultRouter()
router.register(r'bienes', BienesViewSet, basename='bienes')

urlpatterns = [
    path('', include(router.urls)),
>>>>>>> mateo
]