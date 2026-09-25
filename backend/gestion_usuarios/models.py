from django.contrib.auth.models import AbstractUser
from django.db import models
from gestion_datos_personales.models import Persona


class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    id_persona = models.OneToOneField(
        Persona, on_delete=models.CASCADE, related_name="usuario", null=True, blank=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
