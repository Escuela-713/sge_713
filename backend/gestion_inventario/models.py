# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Bienes(models.Model):
    codigo_especial = models.CharField(max_length=45, blank=True, null=True)
    estado = models.CharField(max_length=15, blank=True, null=True)
    id_bien = models.AutoField(primary_key=True)
    categoria = models.CharField(max_length=45, blank=True, null=True)
    prestado = models.IntegerField(blank=True, null=True)
    stock = models.IntegerField(blank=True, null=True)
    descripcion = models.CharField(max_length=150, blank=True, null=True)
    ubicacion = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bienes'


class DetalleInventario(models.Model):
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    cantidad = models.IntegerField(blank=True, null=True)
    id_inventario = models.ForeignKey('RegistroInventario', models.DO_NOTHING, db_column='id_inventario')
    id_bien = models.ForeignKey(Bienes, models.DO_NOTHING, db_column='id_bien')

    class Meta:
        managed = False
        db_table = 'detalle_inventario'


class RegistroInventario(models.Model):
    fecha = models.DateField(blank=True, null=True)
    destino = models.CharField(max_length=50, blank=True, null=True)
    contacto = models.CharField(max_length=45, blank=True, null=True)
    tipo = models.IntegerField(blank=True, null=True)
    responsable = models.CharField(max_length=45, blank=True, null=True)
    id_inventario = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'registro_inventario'
