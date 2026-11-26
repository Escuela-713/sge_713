import unicodedata

from django.db import transaction
from rest_framework import serializers

from .models import (
	CarruselSlide,
	Evento,
	Informacion,
	Noticia,
	TipoInformacion,
	siguiente_orden_tipo,
)


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
	# Tamaño máximo de la imagen subida (5 MB).
	TAMANO_MAXIMO_IMAGEN = 5 * 1024 * 1024

	class Meta:
		model = Informacion
		fields = "__all__"
		read_only_fields = ("created_at", "updated_at")

	def validate_tipo(self, valor):
		valor = " ".join(valor.split())
		if not valor:
			raise serializers.ValidationError("Elegí un tipo.")
		return valor

	def validate_imagen(self, archivo):
		if archivo and archivo.size > self.TAMANO_MAXIMO_IMAGEN:
			raise serializers.ValidationError("La imagen no puede pesar más de 5 MB.")
		return archivo


def _clave_nombre(texto):
	"""Para comparar nombres sin distinguir mayúsculas ni tildes ("Órganos" == "organos")."""
	sin_tildes = unicodedata.normalize("NFD", texto)
	sin_tildes = "".join(c for c in sin_tildes if unicodedata.category(c) != "Mn")
	return sin_tildes.casefold()


class TipoInformacionSerializer(serializers.ModelSerializer):
	# Cuántas tarjetas usan este tipo (el panel lo usa para avisar antes de eliminar).
	cantidad = serializers.SerializerMethodField()

	class Meta:
		model = TipoInformacion
		fields = ["id", "nombre", "orden", "cantidad"]

	def get_cantidad(self, obj):
		return Informacion.objects.filter(tipo=obj.nombre).count()

	def validate_nombre(self, valor):
		valor = " ".join(valor.split())
		if not valor:
			raise serializers.ValidationError("El nombre no puede estar vacío.")
		otros = TipoInformacion.objects.all()
		if self.instance:
			otros = otros.exclude(pk=self.instance.pk)
		if any(_clave_nombre(nombre) == _clave_nombre(valor) for nombre in otros.values_list("nombre", flat=True)):
			raise serializers.ValidationError("Ya existe un tipo con ese nombre.")
		return valor

	def create(self, validated_data):
		validated_data.setdefault("orden", siguiente_orden_tipo())
		return super().create(validated_data)

	@transaction.atomic
	def update(self, instance, validated_data):
		nombre_anterior = instance.nombre
		instance = super().update(instance, validated_data)
		# Si se le cambia el nombre al tipo, las tarjetas que lo usan lo siguen.
		if instance.nombre != nombre_anterior:
			Informacion.objects.filter(tipo=nombre_anterior).update(tipo=instance.nombre)
		return instance
