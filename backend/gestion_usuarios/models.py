from django.db import models
from gestion_datos_personales.models import Persona


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    persona = models.ForeignKey(
        Persona, on_delete=models.CASCADE, related_name="usuarios"
    )
    contrasenia = models.CharField(max_length=128)

    class Meta:
        managed = True
        db_table = "usuario"
