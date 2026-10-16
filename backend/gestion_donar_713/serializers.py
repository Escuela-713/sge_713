from rest_framework import serializers

from .models import CarruselSlide, Evento, Noticia


class ImagenUnificadaMixin:
	"""Unifica 'imagen' (archivo subido) e 'imagen_url' (link externo/estático)
	en un único campo 'imagen' de salida, para que el frontend siempre reciba
	un string usable en <img [src]>, sin importar si la imagen fue subida
	como archivo desde el panel de administración o cargada como URL."""

	def to_representation(self, instance):
		data = super().to_representation(instance)
		imagen_subida = data.get("imagen")
		imagen_url = (data.get("imagen_url") or "").strip()
		data["imagen"] = imagen_subida or imagen_url or ""
		return data


class CarruselSlideSerializer(ImagenUnificadaMixin, serializers.ModelSerializer):
	class Meta:
		model = CarruselSlide
		fields = "__all__"
		read_only_fields = ("created_at", "updated_at")


class EventoSerializer(ImagenUnificadaMixin, serializers.ModelSerializer):
	class Meta:
		model = Evento
		fields = "__all__"
		read_only_fields = ("created_at", "updated_at")


class NoticiaSerializer(ImagenUnificadaMixin, serializers.ModelSerializer):
	class Meta:
		model = Noticia
		fields = "__all__"
		read_only_fields = ("created_at", "updated_at")
