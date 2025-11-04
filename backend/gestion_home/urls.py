from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PublicationViewSet

router = DefaultRouter()
router.register(r"novedades", PublicationViewSet, basename="novedad")

urlpatterns = [
	path("", include(router.urls)),
]
