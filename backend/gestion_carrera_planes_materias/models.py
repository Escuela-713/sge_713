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
    id_carrera = models.AutoField(primary_key=True, db_column='id_carrera', verbose_name='Id carrera')
    nombre = models.CharField(max_length=200, null=False, db_column='nombre', verbose_name='Nombre')
    titulo_egreso = models.CharField(max_length=200, null=False, db_column='titulo_egreso', verbose_name='Título egreso')
    id_estado = models.IntegerField(db_column='id_estado', verbose_name='Id estado', null=False)
    descripcion = models.CharField(max_length=400, null=False, db_column='descripcion', verbose_name='Descripción')

    class Meta:
        managed = True
        db_table = 'carrera'

class Materia(models.Model):
    id_materia = models.AutoField(primary_key=True, db_column='id_materia', verbose_name='Id materia')
    nombre = models.CharField(max_length=200, null=False, db_column='nombre', verbose_name='Nombre')
    ano = models.JSONField(default=list, null=False, validators=[validar_lista_de_anos], db_column='ano', verbose_name='Año')
    minutos_catedra_semanales = models.IntegerField(db_column='minutos_catedra_semanales', verbose_name='Minutos cátedra semanales', null=False)
    minutos_reloj_anuales = models.IntegerField(db_column='minutos_reloj_anuales', verbose_name='Minutos reloj anuales', null=False)
    descripcion = models.CharField(max_length=400, null=False, db_column='descripcion', verbose_name='Descripción')

    class Meta:
        managed = True
        db_table = 'materia'

class Plan(models.Model):
    id_plan = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, null=False)
    estado = models.IntegerField(null=False)
    horas_catedras = models.IntegerField(null=False)
    horas_reloj = models.IntegerField(null=False)
    id_carrera = models.ForeignKey(Carrera, models.DO_NOTHING, db_column='id_carrera', null=False)

    class Meta:
        managed = True
        db_table = 'plan'

class MateriaXPlan(models.Model):
    id_materia = models.ForeignKey(Materia, models.DO_NOTHING, db_column='id_materia', null=False)
    id_plan = models.ForeignKey(Plan, models.DO_NOTHING, db_column='id_plan', null=False)
    horas_semanales = models.IntegerField(null=False)
    horas_anuales = models.IntegerField(null=False)

    class Meta:
        managed = True
        db_table = 'materia_x_plan'

