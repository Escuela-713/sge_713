from django.contrib.auth.models import User
from django.db import models
from gestion_datos_personales.models import Persona


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(
        Persona, on_delete=models.CASCADE,
        related_name="usuario",
        db_column="persona_id"
    )
    id_persona = models.OneToOneField(Persona, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return (
            f"Usuario: {self.user_django.username} - Persona: {self.id_persona.email}"
        )

    @property
    def is_authenticated(self):
        return True
