from rest_framework import serializers

from .models import CarruselSlide, Evento, Informacion, Noticia


class ImagenUnificadaMixin:
	def to_representation(self, instance):
		data = super().to_representation(instance)
		imagen_subida = data.get("imagen")
		imagen_url = (data.get("imagen_url") or "").strip()
		data["imagen"] = imagen_subida or imagen_url or ""
		return data

	def _resolver_imagen(self, validated_data):
		if validated_data.get("imagen"):
			validated_data["imagen_url"] = ""
		elif validated_data.get("imagen_url"):
			validated_data["imagen"] = None
		return validated_data

	def create(self, validated_data):
		return super().create(self._resolver_imagen(validated_data))

	def update(self, instance, validated_data):
		return super().update(instance, self._resolver_imagen(validated_data))


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


class InformacionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Informacion
		fields = "__all__"
		read_only_fields = ("created_at", "updated_at")
