from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import CarruselSlide, Evento, Informacion, Noticia
from .serializers import (
	CarruselSlideSerializer,
	EventoSerializer,
	InformacionSerializer,
	NoticiaSerializer,
)


class CarruselSlideViewSet(viewsets.ModelViewSet):
	queryset = CarruselSlide.objects.all()
	serializer_class = CarruselSlideSerializer
	parser_classes = [MultiPartParser, FormParser, JSONParser]


class EventoViewSet(viewsets.ModelViewSet):
	queryset = Evento.objects.all()
	serializer_class = EventoSerializer
	parser_classes = [MultiPartParser, FormParser, JSONParser]


class NoticiaViewSet(viewsets.ModelViewSet):
	queryset = Noticia.objects.all()
	serializer_class = NoticiaSerializer
	parser_classes = [MultiPartParser, FormParser, JSONParser]


class InformacionViewSet(viewsets.ModelViewSet):
	queryset = Informacion.objects.all()
	serializer_class = InformacionSerializer
	parser_classes = [MultiPartParser, FormParser, JSONParser]


class DonarHomeDataView(APIView):
	def get(self, request, *args, **kwargs):
		contexto = {"request": request}
		slides = CarruselSlide.objects.filter(activo=True)
		eventos_activos = Evento.objects.filter(estado="activo")
		eventos_proximos = Evento.objects.filter(estado="proximo")
		noticias = Noticia.objects.filter(estado="reciente")
		informacion = Informacion.objects.filter(activo=True)

		data = {
			"carrusel": CarruselSlideSerializer(slides, many=True, context=contexto).data,
			"eventosActivos": EventoSerializer(eventos_activos, many=True, context=contexto).data,
			"eventosProximos": EventoSerializer(eventos_proximos, many=True, context=contexto).data,
			"noticias": NoticiaSerializer(noticias, many=True, context=contexto).data,
			"informacion": InformacionSerializer(informacion, many=True, context=contexto).data,
		}
		return Response(data)
