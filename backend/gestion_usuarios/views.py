from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from django.conf import settings
import jwt
from datetime import datetime, timedelta

from .serializers import RegisterSerializer, LoginSerializer


class RegisterAPIView(APIView):
    """Registra un `Usuario` ligado a una `Persona` ya existente."""

    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth_register"

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        usuario = serializer.save()

        # Generar token
        payload = {
            "user_id": usuario.id_usuario,
            "persona_id": usuario.id_usuario.id_persona,
            "exp": datetime.utcnow() + timedelta(hours=2),
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        return Response({"token": token}, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    """Login con email y contrasenia."""

    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth_login"

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        usuario = serializer.validated_data["usuario"]

        payload = {
            "user_id": usuario.id_usuario,
            "persona_id": usuario.id_persona.id_persona,
            "exp": datetime.utcnow() + timedelta(hours=2),
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        return Response({"token": token}, status=status.HTTP_200_OK)
