from django.db import models
from gestion_datos_personales.models import Persona

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Persona, models.DO_NOTHING, db_column='id_persona')
    contrasenia = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'usuario'