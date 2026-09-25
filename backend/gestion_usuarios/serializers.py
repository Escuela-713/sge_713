from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import make_password
from rest_framework import serializers
from gestion_datos_personales.models import Persona
from .models import Usuario
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError


class RegisterSerializer(serializers.Serializer):
    """Registro mínimo que liga un `Persona` existente (por email) a un `Usuario`."""

    email = serializers.EmailField()
    contrasenia = serializers.CharField(
        write_only=True, style={"input_type": "password"}
    )

    def validate_email(self, value):
        try:
            persona = Persona.objects.get(email=value)
        except Persona.DoesNotExist:
            raise serializers.ValidationError(
                "No existe una Persona con ese email. Debe crear primero la Persona."
            )

        if Usuario.objects.filter(id_persona=persona).exists():
            raise serializers.ValidationError(
                "Ya existe un usuario asociado a esa persona."
            )

        return value

    def validate_contrasenia(self, value):
        """Valida la contraseña utilizando los validadores configurados en settings.py"""
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value

    def create(self, validated_data):
        persona = Persona.objects.get(email=validated_data["email"])
        usuario = Usuario.objects.create(
            id_persona=persona, contrasenia=make_password(validated_data["contrasenia"])
        )
        return usuario


class LoginSerializer(serializers.Serializer):
    cuil = serializers.CharField()
    contrasenia = serializers.CharField(write_only=True)

    def validate(self, data):
        cuil = data.get("cuil")
        contrasenia = data.get("contrasenia")

        try:
            persona = Persona.objects.get(dni=cuil)
            usuario = Usuario.objects.get(id_persona=persona)
        except (Persona.DoesNotExist, Usuario.DoesNotExist):
            raise serializers.ValidationError("Credenciales inválidas")

        if not check_password(contrasenia, usuario.contrasenia):
            raise serializers.ValidationError("Credenciales inválidas")

        data["usuario"] = usuario
        return data