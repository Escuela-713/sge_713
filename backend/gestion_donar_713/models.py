from django.db import models


class CarruselSlide(models.Model):
	"""Slides del carrusel principal de la página de inicio de Donar 713."""

	titulo = models.CharField(max_length=255)
	descripcion = models.TextField(blank=True, default="")
	boton_texto = models.CharField(max_length=100, blank=True, default="Ver más")
	# Imagen subida desde el panel de administración (multipart/form-data).
	imagen = models.ImageField(upload_to="donar713/carrusel/", null=True, blank=True)
	# Alternativa: URL externa/estática (ej. assets del propio frontend), por si no se sube archivo.
	imagen_url = models.CharField(max_length=500, blank=True, default="")
	orden = models.PositiveIntegerField(default=0)
	activo = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["orden", "id"]

	def __str__(self):
		return self.titulo


class Evento(models.Model):
	"""Eventos solidarios/de donación mostrados en Donar 713."""

	ESTADO_CHOICES = [
		("activo", "Activo"),
		("proximo", "Próximo"),
		("historial", "Historial"),
	]

	titulo = models.CharField(max_length=255)
	descripcion = models.TextField()
	fecha = models.DateField()
	horario = models.CharField(max_length=100, blank=True, default="")
	lugar = models.CharField(max_length=255, blank=True, default="")
	imagen = models.ImageField(upload_to="donar713/eventos/", null=True, blank=True)
	imagen_url = models.CharField(max_length=500, blank=True, default="")
	estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default="activo")
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["-fecha"]

	def __str__(self):
		return self.titulo


class Noticia(models.Model):
	"""Noticias/novedades publicadas por el equipo de Donar 713."""

	ESTADO_CHOICES = [
		("reciente", "Reciente"),
		("historial", "Historial"),
	]

	titulo = models.CharField(max_length=255)
	descripcion = models.TextField()
	fecha = models.DateField()
	imagen = models.ImageField(upload_to="donar713/noticias/", null=True, blank=True)
	imagen_url = models.CharField(max_length=500, blank=True, default="")
	estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default="reciente")
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["-fecha"]

	def __str__(self):
		return self.titulo
