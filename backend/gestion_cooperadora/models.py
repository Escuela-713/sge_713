from django.db import models


class Movimiento(models.Model):
	INGRESO = 'Ingreso'
	EGRESO = 'Egreso'
	TIPOS = (
		(INGRESO, 'Ingreso'),
		(EGRESO, 'Egreso'),
	)

	fecha = models.DateField()
	tipo = models.CharField(max_length=7, choices=TIPOS)
	monto = models.DecimalField(max_digits=12, decimal_places=2)
	origen = models.CharField(max_length=100)
	destino = models.CharField(max_length=200)
	descripcion = models.CharField(max_length=500, blank=True)

	def __str__(self):
		return f'{self.tipo} - {self.monto}'

# Create your models here.
