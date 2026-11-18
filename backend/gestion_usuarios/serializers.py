from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
from rest_framework import serializers

from gestion_datos_personales.models import Persona, Rol
from .models import Usuario


class RegisterSerializer(serializers.Serializer):
    dni = serializers.CharField(max_length=32)
    primer_nombre = serializers.CharField(max_length=128)
    primer_apellido = serializers.CharField(max_length=128)
    fecha_nacimiento = serializers.DateField()
    email = serializers.EmailField(max_length=64)
    telefono = serializers.CharField(max_length=64)
    calle = serializers.CharField(max_length=64)
    numero_calle = serializers.IntegerField(min_value=1, max_value=32767)
    barrio = serializers.CharField(max_length=128)
    id_localidad = serializers.IntegerField()
    id_localidad_nacimiento = serializers.IntegerField()

    segundo_nombre = serializers.CharField(
        max_length=128, required=False, allow_blank=True
    )
    tercer_nombre = serializers.CharField(
        max_length=128, required=False, allow_blank=True
    )
    segundo_apellido = serializers.CharField(
        max_length=128, required=False, allow_blank=True
    )
    genero = serializers.ChoiceField(choices=Persona.Genero.choices, required=False)
    tipo_sangre = serializers.ChoiceField(
        choices=Persona.TipoSanguineo.choices, required=False, allow_null=True
    )

    contrasenia = serializers.CharField(
        write_only=True, style={"input_type": "password"}
    )

    def validate_dni(self, value):
        if Persona.objects.filter(dni=value).exists():
            raise serializers.ValidationError(
                "Ya existe una persona registrada con ese DNI."
            )
        return value

    def validate_contrasenia(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as exc:
            raise serializers.ValidationError(list(exc.messages))
        return value

    @transaction.atomic
    def create(self, validated_data):
        contrasenia = validated_data.pop("contrasenia")

        persona = Persona.objects.create(**validated_data)

        usuario = Usuario.objects.create(
            id_persona=persona, contrasenia=make_password(contrasenia)
        )

        return usuario


class LoginSerializer(serializers.Serializer):
    dni = serializers.CharField(required=True)
    contrasenia = serializers.CharField(
        required=True, write_only=True, style={"input_type": "password"}
    )

    def validate(self, data):
        try:
            persona = Persona.objects.get(dni=data["dni"])
            usuario = Usuario.objects.get(id_persona=persona)
        except (Persona.DoesNotExist, Usuario.DoesNotExist):
            raise serializers.ValidationError(
                {"error": "Credenciales inválidas o usuario no registrado."}
            )

        if not check_password(data["contrasenia"], usuario.contrasenia):
            raise serializers.ValidationError({"error": "Credenciales inválidas."})

        data["usuario"] = usuario
        return data


class UserSerializer(serializers.ModelSerializer):
    dni = serializers.CharField(source="id_persona.dni", read_only=True)
    nombre = serializers.SerializerMethodField()
    roles = serializers.SerializerMethodField()
    rol = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = ["id_usuario", "dni", "nombre", "rol", "roles"]

    def get_nombre(self, obj):
        return f"{obj.id_persona.primer_nombre} {obj.id_persona.primer_apellido}"

    def get_roles(self, obj):
        return list(obj.id_persona.roles.values_list("rol", flat=True))

    def get_rol(self, obj):
        roles = self.get_roles(obj)

        if not roles:
            return "invitado"

        return roles[0]
