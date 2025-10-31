from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PublicationViewSet

router = DefaultRouter()
router.register(r"publications", PublicationViewSet, basename="publication")

urlpatterns = [
	path("", include(router.urls)),
]
