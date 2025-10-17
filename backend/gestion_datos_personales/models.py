from django.db import models

class Persona(models.Model):
    id_persona = models.AutoField(primary_key=True)
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

class Alumno(models.Model):
    id_alumno = models.AutoField(primary_key=True)
    id_curso = models.IntegerField(blank=True, null=True)
    esc_origen = models.CharField(max_length=45)
    legajo = models.IntegerField(blank=True, null=True)
    fecha_ingreso = models.DateField(blank=True, null=True)
    n_libro_matriz = models.IntegerField(blank=True, null=True)
    fecha_egreso = models.DateField(db_column='fecha egreso', blank=True, null=True)  # Field renamed to remove unsuitable characters.
    cuil = models.CharField(max_length=15)

    id_persona = models.ForeignKey(Persona, models.DO_NOTHING, db_column='id_persona', null=True)


    class Meta:
        managed = True
        db_table = 'alumno'

class Tutor(models.Model):
    id_tutor = models.AutoField(primary_key=True)
    profesion = models.CharField(max_length=45)
    lugar_trabajo = models.CharField(max_length=45)
    telefono = models.CharField(max_length=45)

    id_persona = models.ForeignKey(Persona, models.DO_NOTHING, db_column='id_persona')
    class Meta:
        managed = True
        db_table = 'tutor'
