from django.db import models


class Publication(models.Model):
	"""Publicación para la página de home."""
	title = models.CharField(max_length=255)
	content = models.TextField()
	# imagen opcional; requiere Pillow si se suben archivos
	image = models.ImageField(upload_to="home/", null=True, blank=True)
	is_published = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["-created_at"]

	def __str__(self):
		return self.title
