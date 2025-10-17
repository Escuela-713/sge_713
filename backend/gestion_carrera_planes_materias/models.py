from django.db import models

class Materia(models.Model):
    id_materia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    año= models.IntegerField(null=True)
    horasCatedrasSemanales= models.IntegerField(null=True)
    horasRelojAnuales= models.IntegerField(null=True)
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

class Carrera(models.Model):
    id_carrera = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    titulo_egreso = models.CharField(max_length=125)
    id_estado = models.IntegerField()
    descripcion=models.CharField(max_length=255,blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'carrera'

class Plan(models.Model):
    id_plan = models.AutoField(primary_key=True)
    id_carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, db_column='id_carrera',null=True)
    nombre= models.CharField(max_length=45)
    estado= models.BooleanField(null=True)
    horas_catedra = models.IntegerField()
    horas_reloj = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'plan'
