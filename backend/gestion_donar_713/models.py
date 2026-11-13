from django.db import models


class CarruselSlide(models.Model):
	titulo = models.CharField(max_length=255)
	descripcion = models.TextField(blank=True, default="")
	boton_texto = models.CharField(max_length=100, blank=True, default="Ver más")
	imagen = models.ImageField(upload_to="donar713/carrusel/", null=True, blank=True)
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


class TipoInformacion(models.Model):
	"""Opciones de "tipo" que se pueden elegir al cargar una tarjeta de información."""

	nombre = models.CharField(max_length=100, unique=True)
	orden = models.PositiveIntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["orden", "id"]
		verbose_name = "tipo de información"
		verbose_name_plural = "tipos de información"

	def __str__(self):
		return self.nombre


class Informacion(models.Model):
	# Guarda el nombre del tipo (ver TipoInformacion). No hay opciones fijas: se cargan desde el panel.
	tipo = models.CharField(max_length=100)
	titulo = models.CharField(max_length=255)
	descripcion = models.TextField()
	# Solo se aceptan imágenes subidas como archivo (igual que en eventos); no hay campo de URL.
	imagen = models.ImageField(upload_to="donar713/informacion/", null=True, blank=True)
	orden = models.PositiveIntegerField(default=0)
	activo = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["orden", "id"]
		verbose_name_plural = "información"

	def __str__(self):
		return self.titulo


# Valores que usaba la versión anterior (tipo fijo) y el nombre legible que pasan a tener.
TIPOS_ORIGINALES = {
	"requisito": "Requisitos para donar",
	"pregunta": "Preguntas frecuentes",
}


def sincronizar_tipos_informacion():
	"""Deja la lista de tipos alineada con las tarjetas que ya existen.

	- Si todavía no hay tipos cargados, convierte los valores viejos ("requisito", "pregunta")
	  en nombres legibles. Es un arreglo de una sola vez para los datos anteriores.
	- Crea el tipo de cualquier tarjeta cuyo tipo no esté en la lista.
	Es seguro llamarla muchas veces: si no hay nada que arreglar, no cambia nada.
	"""
	if not TipoInformacion.objects.exists():
		for viejo, nuevo in TIPOS_ORIGINALES.items():
			Informacion.objects.filter(tipo=viejo).update(tipo=nuevo)

	existentes = set(TipoInformacion.objects.values_list("nombre", flat=True))
	faltantes = list(
		Informacion.objects.exclude(tipo__in=existentes)
		.order_by()  # sin el orden por defecto del modelo, para que distinct() agrupe por nombre
		.values_list("tipo", flat=True)
		.distinct()
	)
	# Los dos tipos originales van primero y en su orden de siempre; el resto, alfabético.
	originales = list(TIPOS_ORIGINALES.values())
	faltantes.sort(key=lambda n: (0, originales.index(n)) if n in originales else (1, n.casefold()))
	for nombre in faltantes:
		TipoInformacion.objects.create(nombre=nombre, orden=siguiente_orden_tipo())


def siguiente_orden_tipo():
	ultimo = TipoInformacion.objects.order_by("-orden").values_list("orden", flat=True).first()
	return 0 if ultimo is None else ultimo + 1
