from rest_framework import serializers
from gestion_datos_personales.models import Persona
from .models import Usuario


class RegisterSerializer(serializers.Serializer):
	"""Registro mínimo que liga un `Persona` existente (por email) a un `Usuario`.

	Nota: el proyecto actual guarda la contraseña en el campo `contrasenia` de `Usuario`.
	Esto mantiene compatibilidad con la estructura existente. Es inseguro para producción
	— se recomienda migrar a Django `User` y almacenar hashes.
	"""
	email = serializers.EmailField()
	contrasenia = serializers.CharField(write_only=True)

	def validate_email(self, value):
		try:
			persona = Persona.objects.get(email=value)
		except Persona.DoesNotExist:
			raise serializers.ValidationError("No existe una Persona con ese email. Debe crear primero la Persona.")

		# check if a Usuario already exists for this persona
		if Usuario.objects.filter(id_persona=persona).exists():
			raise serializers.ValidationError("Ya existe un usuario asociado a esa persona.")

		return value

	def create(self, validated_data):
		persona = Persona.objects.get(email=validated_data['email'])
		usuario = Usuario.objects.create(id_persona=persona, contrasenia=validated_data['contrasenia'])
		return usuario


class LoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	contrasenia = serializers.CharField(write_only=True)

	def validate(self, data):
		email = data.get('email')
		contrasenia = data.get('contrasenia')

		try:
			persona = Persona.objects.get(email=email)
		except Persona.DoesNotExist:
			raise serializers.ValidationError("Credenciales inválidas")

		try:
			usuario = Usuario.objects.get(id_persona=persona)
		except Usuario.DoesNotExist:
			raise serializers.ValidationError("Credenciales inválidas")

		# Nota: comparacion directa para mantener compatibilidad con DB existente
		if usuario.contrasenia != contrasenia:
			raise serializers.ValidationError("Credenciales inválidas")

		data['usuario'] = usuario
		return data


