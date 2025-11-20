# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from gestion_datos_personales import models as gestion_datos_personales_models


class MesasExamenes(models.Model):
    id_mesas_examenes = models.IntegerField(db_column='id_mesas_examenes', primary_key=True)  # Field renamed to remove unsuitable characters. The composite primary key (id-mesas-examenes, id-profesores, id-materias) found, that is not supported. The first column is selected.
    dia = models.DateTimeField()
    hora = models.DateTimeField()
    tema = models.CharField(max_length=45)
    id_profesores = models.ForeignKey('Profesores', models.DO_NOTHING, null=True)  # deberia ser un tribunal, es decir mas de un profesor. Hagan lo que puedan, mucha suerte.
    id_materias = models.IntegerField('Id_materias', models.DO_NOTHING,null=True)  # Field renamed to remove unsuitable characters.
    id_modalidades = models.ForeignKey('Modalidades', models.DO_NOTHING,  null=True)  # Field renamed to remove unsuitable characters.
    id_alumno = models.IntegerField('Id_alumno', models.DO_NOTHING, null=True) # Revisar.
    class Meta:
        managed = True
        db_table = 'mesas_examenes'
        


class Modalidades(models.Model):
    id_modalidades = models.IntegerField(db_column='id_modalidades', primary_key=True)  # Field renamed to remove unsuitable characters.
    nombre = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'modalidades'


class Profesores(models.Model):
    id_profesores = models.IntegerField(db_column='id_profesores', primary_key=True)  # Field renamed to remove unsuitable characters.
    nombre = models.CharField(max_length=45)
    apellido = models.CharField(max_length=45)
    dni = models.CharField(max_length=45)
    telefono = models.IntegerField()
    mail = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'profesores'
