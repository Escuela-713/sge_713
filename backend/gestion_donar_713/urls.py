from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CarruselSlideViewSet, EventoViewSet, NoticiaViewSet, DonarHomeDataView

router = DefaultRouter()
router.register(r"donar/carrusel", CarruselSlideViewSet, basename="donar-carrusel")
router.register(r"donar/eventos", EventoViewSet, basename="donar-evento")
router.register(r"donar/noticias", NoticiaViewSet, basename="donar-noticia")

urlpatterns = [
	path("", include(router.urls)),
	path("donar/home-data/", DonarHomeDataView.as_view(), name="donar-home-data"),
]
