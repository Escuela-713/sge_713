from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from gestion_datos_personales.models import Persona
from .models import Usuario
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError


class RegisterSerializer(serializers.Serializer):
    """Registro basado en CUIL y contraseña, enlazado a una Persona existente."""

    cuil = serializers.CharField()
    contrasenia = serializers.CharField(
        write_only=True, style={"input_type": "password"}
    )

    def validate_cuil(self, value):
        try:
            persona = Persona.objects.get(dni=value)
        except Persona.DoesNotExist:
            raise serializers.ValidationError(
                "No existe una Persona registrada con ese CUIL."
            )

        if Usuario.objects.filter(id_persona=persona).exists():
            raise serializers.ValidationError(
                "Ya existe un usuario asociado a ese CUIL."
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
        persona = Persona.objects.get(dni=validated_data["cuil"])
        usuario = Usuario.objects.create(
            id_persona=persona, contrasenia=make_password(validated_data["contrasenia"])
        )
        return usuario


class LoginSerializer(serializers.Serializer):
    """Serializador para el inicio de sesión basado en CUIL y contraseña."""

    cuil = serializers.CharField(required=True)
    contrasenia = serializers.CharField(
        required=True, write_only=True, style={"input_type": "password"}
    )

    def validate(self, data):
        cuil = data.get("cuil")
        contrasenia = data.get("contrasenia")

        try:
            persona = Persona.objects.get(dni=cuil)
            usuario = Usuario.objects.get(id_persona=persona)
        except (Persona.DoesNotExist, Usuario.DoesNotExist):
            raise serializers.ValidationError(
                {"error": "Credenciales inválidas o usuario no registrado."}
            )

        from django.contrib.auth.hashers import check_password

        if not check_password(contrasenia, usuario.contrasenia):
            raise serializers.ValidationError({"error": "Credenciales inválidas."})

        data["usuario"] = usuario
        return data


class UserSerializer(serializers.ModelSerializer):
    """Serializador para exponer la información del usuario autenticado."""

    cuil = serializers.CharField(source="id_persona.dni", read_only=True)
    nombre = serializers.SerializerMethodField()
    rol = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = ["id_usuario", "cuil", "nombre", "rol"]

    def get_nombre(self, obj):
        if obj.id_persona:
            return f"{obj.id_persona.primer_nombre} {obj.id_persona.primer_apellido}"
        return ""

    def get_rol(self, obj):
        return getattr(obj, "rol", None) or "Usuario"
