# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class MesasExamenes(models.Model):
    id_mesas_examenes = models.IntegerField(db_column='id_mesas_examenes', primary_key=True)
    dia = models.DateTimeField()
    hora = models.DateTimeField()
    tema = models.CharField(max_length=45)

    id_profesores = models.ForeignKey(
        'Profesores',
        models.DO_NOTHING,
        db_column='profesor',
        null=True
    )

    id_materias = models.IntegerField(db_column='id_materias', null=True)

    id_modalidades = models.ForeignKey(
        'Modalidades',
        models.DO_NOTHING,
        db_column='modalidad',
        null=True
    )

    id_alumno = models.IntegerField(db_column='id_alumno', null=True)

    class Meta:
        managed = True
        db_table = 'mesas_examenes'
        unique_together = (('id_mesas_examenes', 'id_profesores', 'id_materias'),)


class Modalidades(models.Model):
    id_modalidades = models.IntegerField(db_column='id_modalidades', primary_key=True)
    nombre = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'modalidades'


class Profesores(models.Model):
    id_profesores = models.IntegerField(db_column='id_profesores', primary_key=True)
    nombre = models.CharField(max_length=45)
    apellido = models.CharField(max_length=45)
    dni = models.CharField(max_length=45)
    telefono = models.IntegerField()
    mail = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'profesores'
