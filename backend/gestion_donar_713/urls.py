from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
	CarruselSlideViewSet,
	DonarHomeDataView,
	EventoViewSet,
	InformacionViewSet,
	NoticiaViewSet,
	TipoInformacionViewSet,
)

router = DefaultRouter()
router.register(r"donar/carrusel", CarruselSlideViewSet, basename="donar-carrusel")
router.register(r"donar/eventos", EventoViewSet, basename="donar-evento")
router.register(r"donar/noticias", NoticiaViewSet, basename="donar-noticia")
router.register(r"donar/informacion", InformacionViewSet, basename="donar-informacion")
router.register(r"donar/tipos-informacion", TipoInformacionViewSet, basename="donar-tipo-informacion")

urlpatterns = [
	path("", include(router.urls)),
	path("donar/home-data/", DonarHomeDataView.as_view(), name="donar-home-data"),
]
