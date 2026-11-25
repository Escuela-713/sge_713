from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from gestion_datos_personales.models import Persona


class UsuarioManager(BaseUserManager):
    def create_user(self, id_persona, password=None, **extra_fields):
        if not id_persona:
            raise ValueError("El usuario debe estar asociado a una persona.")

        if not isinstance(id_persona, Persona):
            id_persona = Persona.objects.get(pk=id_persona)

        usuario = self.model(
            id_persona=id_persona,
            **extra_fields,
        )

        usuario.set_password(password)
        usuario.save(using=self._db)

        return usuario

    def create_superuser(self, id_persona, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("El superusuario debe tener is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("El superusuario debe tener is_superuser=True.")

        return self.create_user(id_persona, password, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    id_usuario = models.AutoField(primary_key=True)

    id_persona = models.OneToOneField(
        Persona,
        on_delete=models.CASCADE,
        related_name="usuario",
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = "id_persona"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"Usuario: {self.id_usuario} - Persona: {self.id_persona.email}"
