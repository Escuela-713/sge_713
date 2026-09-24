# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from gestion_carrera_planes_materias.models import Carrera, Materia, validar_lista_de_anos
from gestion_datos_personales.models import Alumno

class MesaExamen(models.Model):
    id_mesa_examen = models.AutoField(primary_key=True)
    dia = models.DateField(null=False)
    hora = models.TimeField(null=False)
    ano = models.IntegerField(null=False, db_column='ano')
    id_carrera = models.ForeignKey(Carrera, null=False, on_delete=models.CASCADE, db_column='id_carrera')
    id_materia = models.ForeignKey(Materia, null=False,  on_delete=models.CASCADE, db_column='id_materia')
    profesor_titular = models.CharField(max_length=200, null=False)
    profesor_primer_vocal = models.CharField(max_length=200, null=False)
    profesor_segundo_vocal = models.CharField(max_length=200, null=False)
    ruta_al_examen_model = models.CharField(default='', max_length=300)

    class Meta:
        managed = True
        db_table = 'mesa_examen'

class AlumnosAnotadosAMesas(models.Model):
    id_mesa_examen = models.IntegerField()
    id_alumno = models.ForeignKey(MesaExamen, models.DO_NOTHING, db_column='id_alumno')

    class Meta:
        managed = True
        db_table = 'alumnos_anotados_a_mesas'

