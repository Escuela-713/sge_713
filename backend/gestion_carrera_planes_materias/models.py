from django.core.exceptions import ValidationError
from django.db import models

def validar_lista_de_anos(lista_anos):
    if not isinstance(lista_anos, list):
        raise ValidationError('El o los años deben ser una lista.')

    if (len(lista_anos) == 0):
        raise ValidationError('Ingrese al menos sea un año.')
    
    for item in lista_anos:
        if (not isinstance(item, int) or isinstance(item, bool)):
            raise ValidationError('Todos los items deben ser números enteros')

        if (item < 1 or item > 7):
            raise ValidationError('Ingrese años permitidos (entre 1 y 7).')

class Carrera(models.Model):
    id_carrera = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, null=False)
    titulo_egreso = models.CharField(max_length=200, null=False)
    id_estado = models.IntegerField()
    descripcion = models.CharField(max_length=400, null=False)

    class Meta:
        managed = False
        db_table = 'carrera'

class Materia(models.Model):
    id_materia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, null=False)
    ano = models.JSONField(default=list, validators=[validar_lista_de_anos])
    minutos_catedra_semanales = models.IntegerField()
    minutos_reloj_anuales = models.IntegerField()
    descripcion = models.CharField(max_length=400, null=False)

    class Meta:
        managed = False
        db_table = 'materia'

class Plan(models.Model):
    id_plan = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, null=False)
    estado = models.IntegerField()
    horas_catedras = models.IntegerField()
    horas_reloj = models.IntegerField()
    id_carrera = models.ForeignKey(Carrera, models.DO_NOTHING, db_column='id_carrera')

    class Meta:
        managed = False
        db_table = 'plan'

class MateriaXPlan(models.Model):
    id_materia = models.ForeignKey(Materia, models.DO_NOTHING, db_column='id_materia')
    id_plan = models.ForeignKey(Plan, models.DO_NOTHING, db_column='id_plan')
    horas_semanales = models.IntegerField()
    horas_anuales = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'materia_x_plan'

