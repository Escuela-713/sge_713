# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, unique=True)

    class Meta:
        db_table = 'inventario_categoria'
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Ubicacion(models.Model):
    id_ubicacion = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'inventario_ubicacion'
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Bienes(models.Model):
    ESTADOS = [
        ('Bueno', 'Bueno'),
        ('Regular', 'Regular'),
        ('Malo', 'Malo'),
        ('En uso', 'En uso'),
        ('En reparación', 'En reparación'),
    ]

    id_bien = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=150, blank=True, null=True)
    categoria = models.ForeignKey(
        Categoria, on_delete=models.PROTECT, db_column='id_categoria',
        related_name='bienes', null=True,
    )
    ubicacion = models.ForeignKey(
        Ubicacion, on_delete=models.PROTECT, db_column='id_ubicacion',
        related_name='bienes', null=True,
    )
    estado = models.CharField(max_length=15, choices=ESTADOS)
    cantidad = models.PositiveIntegerField(default=1)
    prestado = models.PositiveIntegerField(default=0)
    codigo_especial = models.CharField(max_length=30, unique=True, blank=True, null=True)
    fecha_adquisicion = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'bienes'
        ordering = ['nombre', 'id_bien']

    def __str__(self):
        return self.nombre


class RegistroInventario(models.Model):
    id_inventario = models.AutoField(primary_key=True)
    fecha = models.DateField(blank=True, null=True)
    destino = models.CharField(max_length=50, blank=True, null=True)
    contacto = models.CharField(max_length=45, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    mail = models.EmailField(max_length=100, blank=True, null=True)
    tipo = models.IntegerField(blank=True, null=True)
    responsable = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        db_table = 'registro_inventario'

    def __str__(self):
        return f'Registro {self.id_inventario}'


class DetalleInventario(models.Model):
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    cantidad = models.IntegerField(blank=True, null=True)
    id_inventario = models.ForeignKey(
        RegistroInventario, on_delete=models.CASCADE, db_column='id_inventario',
    )
    id_bien = models.ForeignKey(
        Bienes, on_delete=models.PROTECT, db_column='id_bien',
    )

    class Meta:
        db_table = 'detalle_inventario'

    def __str__(self):
        return f'Detalle {self.pk}'