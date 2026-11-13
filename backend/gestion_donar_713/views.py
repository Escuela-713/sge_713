from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
	CarruselSlide,
	Evento,
	Informacion,
	Noticia,
	TipoInformacion,
	sincronizar_tipos_informacion,
)
from .serializers import (
	CarruselSlideSerializer,
	EventoSerializer,
	InformacionSerializer,
	NoticiaSerializer,
	TipoInformacionSerializer,
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

	def list(self, request, *args, **kwargs):
		# Así el panel recibe siempre los tipos ya convertidos, sin depender de qué lista cargue primero.
		sincronizar_tipos_informacion()
		return super().list(request, *args, **kwargs)


class TipoInformacionViewSet(viewsets.ModelViewSet):
	queryset = TipoInformacion.objects.all()
	serializer_class = TipoInformacionSerializer

	def list(self, request, *args, **kwargs):
		sincronizar_tipos_informacion()
		return super().list(request, *args, **kwargs)

	def destroy(self, request, *args, **kwargs):
		tipo = self.get_object()
		en_uso = Informacion.objects.filter(tipo=tipo.nombre).count()
		if en_uso:
			return Response(
				{
					"detail": (
						f"No se puede eliminar: hay {en_uso} tarjeta(s) con este tipo. "
						"Cambialas de tipo o eliminalas primero."
					)
				},
				status=status.HTTP_400_BAD_REQUEST,
			)
		return super().destroy(request, *args, **kwargs)


class DonarHomeDataView(APIView):
	def get(self, request, *args, **kwargs):
		sincronizar_tipos_informacion()
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
			"tiposInformacion": TipoInformacionSerializer(
				TipoInformacion.objects.all(), many=True, context=contexto
			).data,
		}
		return Response(data)
