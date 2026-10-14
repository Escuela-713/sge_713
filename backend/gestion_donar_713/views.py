from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import CarruselSlide, Evento, Noticia
from .serializers import CarruselSlideSerializer, EventoSerializer, NoticiaSerializer


class CarruselSlideViewSet(viewsets.ModelViewSet):
	"""CRUD de los slides del carrusel de Donar 713 (incluye subida de imagen)."""
	queryset = CarruselSlide.objects.all()
	serializer_class = CarruselSlideSerializer
	parser_classes = [MultiPartParser, FormParser, JSONParser]


class EventoViewSet(viewsets.ModelViewSet):
	"""CRUD de eventos de Donar 713 (incluye subida de imagen)."""
	queryset = Evento.objects.all()
	serializer_class = EventoSerializer
	parser_classes = [MultiPartParser, FormParser, JSONParser]


class NoticiaViewSet(viewsets.ModelViewSet):
	"""CRUD de noticias de Donar 713 (incluye subida de imagen)."""
	queryset = Noticia.objects.all()
	serializer_class = NoticiaSerializer
	parser_classes = [MultiPartParser, FormParser, JSONParser]


class DonarHomeDataView(APIView):
	"""Datos públicos para la página de inicio de Donar 713:
	slides del carrusel activos + eventos activos/próximos."""

	def get(self, request, *args, **kwargs):
		slides = CarruselSlide.objects.filter(activo=True)
		eventos_activos = Evento.objects.filter(estado="activo")
		eventos_proximos = Evento.objects.filter(estado="proximo")

		data = {
			"carrusel": CarruselSlideSerializer(slides, many=True, context={"request": request}).data,
			"eventosActivos": EventoSerializer(eventos_activos, many=True, context={"request": request}).data,
			"eventosProximos": EventoSerializer(eventos_proximos, many=True, context={"request": request}).data,
		}
		return Response(data)
