from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PublicationViewSet, HomePageDataView

router = DefaultRouter()
router.register(r"novedades", PublicationViewSet, basename="novedad")

urlpatterns = [
	path("", include(router.urls)),
    path("home-data/", HomePageDataView.as_view(), name="home-data"),
]