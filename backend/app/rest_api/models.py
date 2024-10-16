# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from rest_framework import serializers

class Alumno(models.Model):
    id_alumno = models.AutoField(primary_key=True)
    id_curso = models.IntegerField(blank=True, null=True)
    esc_origen = models.CharField(max_length=45)
    legajo = models.IntegerField(blank=True, null=True)
    fecha_ingreso = models.DateField(blank=True, null=True)
    n_libro_matriz = models.IntegerField(blank=True, null=True)
    fecha_egreso = models.DateField(db_column='fecha egreso', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    cuil = models.CharField(max_length=15)

    class Meta:
        managed = True
        db_table = 'alumno'


class AlumnoXPlan(models.Model):
    id_alumno = models.OneToOneField(Alumno, models.DO_NOTHING, db_column='id_alumno', primary_key=True)  # The composite primary key (id_alumno, id_plan) found, that is not supported. The first column is selected.
    id_plan = models.ForeignKey('Plan', models.DO_NOTHING, db_column='id_plan')

    class Meta:
        managed = True
        db_table = 'alumno_x_plan'
        unique_together = (('id_alumno', 'id_plan'),)

class Carrera(models.Model):
    id_carrera = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    titulo_egreso = models.CharField(max_length=125)
    id_estado = models.IntegerField()
    descripcion=models.CharField(max_length=255,blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'carrera'

class Curso(models.Model):
    id_curso = models.AutoField(primary_key=True)
    anio = models.SmallIntegerField()
    division = models.CharField(max_length=15)

    class Meta:
        managed = True
        db_table = 'curso'

class Instancia(models.Model):
    id_instancia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'instancia'

class Localidad(models.Model):
    id_localidad = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    codigo_postal = models.PositiveSmallIntegerField(blank=True, null=True)
    id_provincia = models.ForeignKey('Provincia', models.DO_NOTHING, db_column='id_provincia')

    class Meta:
        managed = True
        db_table = 'localidad'

class Materia(models.Model):
    id_materia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'materia'

class MateriaXPlan(models.Model):
    id_materia = models.OneToOneField(Materia, models.DO_NOTHING, db_column='id_materia', primary_key=True)  # The composite primary key (id_materia, id_plan) found, that is not supported. The first column is selected.
    id_plan = models.ForeignKey('Plan', models.DO_NOTHING, db_column='id_plan')
    hs_semanales = models.SmallIntegerField()
    hs_anuales = models.SmallIntegerField()

    class Meta:
        managed = True
        db_table = 'materia_x_plan'
        unique_together = (('id_materia', 'id_plan'),)

class Pais(models.Model):
    id_pais = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'pais'


class Persona(models.Model):
    id_persona = models.AutoField(primary_key=True)
    id_alumno = models.ForeignKey(Alumno, models.DO_NOTHING, db_column='id_alumno')
    nombre = models.CharField(max_length=45)
    apellido = models.CharField(max_length=45)
    fecha_nacimiento = models.DateField()
    email = models.CharField(max_length=45)
    telefono = models.CharField(max_length=45)
    id_genero = models.SmallIntegerField()
    dni = models.IntegerField()
    grupo_sanguineo = models.CharField(db_column='grupo sanguineo', max_length=2, blank=True, null=True)  # Field renamed to remove unsuitable characters.
    calle = models.CharField(max_length=45)
    numero = models.SmallIntegerField()
    barrio = models.CharField(max_length=45)
    id_localidad = models.IntegerField()
    id_localidad_nacimiento = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'persona'


class Plan(models.Model):
    id_plan = models.AutoField(primary_key=True)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, db_column='id_carrera')
    horas_catedra = models.IntegerField()
    horas_reloj = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'plan'

class Provincia(models.Model):
    id_provincia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    id_pais = models.ForeignKey(Pais, models.DO_NOTHING, db_column='id_pais')

    class Meta:
        managed = True
        db_table = 'provincia'


class Trayectoria(models.Model):
    notas = models.CharField(max_length=45)
    observacion = models.CharField(max_length=50)
    fecha = models.DateField()
    id_curso = models.OneToOneField(Curso, models.DO_NOTHING, db_column='id_curso', primary_key=True)  # The composite primary key (id_curso, id_alumno, id_materia, id_instancia) found, that is not supported. The first column is selected.
    id_alumno = models.ForeignKey(Alumno, models.DO_NOTHING, db_column='id_alumno')
    id_materia = models.ForeignKey(Materia, models.DO_NOTHING, db_column='id_materia')
    id_instancia = models.ForeignKey(Instancia, models.DO_NOTHING, db_column='id_instancia')

    class Meta:
        managed = True
        db_table = 'trayectoria'
        unique_together = (('id_curso', 'id_alumno', 'id_materia', 'id_instancia'),)


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Persona, models.DO_NOTHING, db_column='id_persona')
    contrasenia = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'usuario'
