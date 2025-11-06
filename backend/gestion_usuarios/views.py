from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import jwt
from datetime import datetime, timedelta

from .serializers import RegisterSerializer, LoginSerializer


class RegisterAPIView(APIView):
	"""Registra un `Usuario` ligado a una `Persona` ya existente (buscada por email)."""

	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		if not serializer.is_valid():
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		usuario = serializer.save()

		# generar token
		payload = {
			'user_id': usuario.id_usuario,
			'persona_id': usuario.id_persona.id_persona,
			'exp': datetime.utcnow() + timedelta(hours=2)
		}
		token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

		return Response({'token': token}, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
	"""Login con email (campo en Persona) y contrasenia (campo en Usuario).

	Retorna un JWT simple con `user_id` y `persona_id`.
	"""

	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		if not serializer.is_valid():
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		usuario = serializer.validated_data['usuario']

		payload = {
			'user_id': usuario.id_usuario,
			'persona_id': usuario.id_persona.id_persona,
			'exp': datetime.utcnow() + timedelta(hours=2)
		}
		token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

		return Response({'token': token}, status=status.HTTP_200_OK)

