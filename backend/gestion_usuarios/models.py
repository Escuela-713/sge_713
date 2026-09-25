from django.db import models
from gestion_datos_personales.models import Persona


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    id_persona = models.OneToOneField(
        Persona, 
        on_delete=models.CASCADE, 
        related_name="usuario"
    )
    contrasenia = models.CharField(max_length=128)

    def __str__(self):
        return f"Usuario: {self.id_usuario} - Persona: {self.id_persona.email}"

    @property
    def is_authenticated(self):
        return True