from datetime import timedelta
from django.conf import settings
from django.utils import timezone
import jwt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from .serializers import LoginSerializer, RegisterSerializer


class RegisterAPIView(APIView):
  """Registra un `Usuario` ligado a una `Persona` ya existente."""

  throttle_classes = [ScopedRateThrottle]
  throttle_scope = "auth_register"

  def post(self, request):
    serializer = RegisterSerializer(data=request.data)
    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    usuario = serializer.save()

    payload = {
        "user_id": usuario.id_usuario,
        "persona_id": usuario.id_persona.persona,
        "exp": timezone.now() + timedelta(hours=2),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    # Datos adicionales del usuario para el frontend
    usuario_data = {
        "id": usuario.id_usuario,
        "cuil": usuario.cuil,
        "rol": getattr(usuario.id_rol, "nombre", None),
    }

    # Creamos la respuesta JSON (sin el token dentro del body)
    response = Response(
        {"mensaje": "Registro exitoso", "usuario": usuario_data},
        status=status.HTTP_201_CREATED,
    )

    # Inyectamos el token en una cookie HttpOnly segura
    response.set_cookie(
        key="auth_token",
        value=token,
        httponly=True,  # Inaccesible para JavaScript en el cliente (protección XSS)
        secure=False,  # Cambiar a True si en producción usás HTTPS
        samesite="Lax",  # O 'Strict' según convenga a tu arquitectura
        max_age=7200,  # 2 horas en segundos (coincide con la expiración del JWT)
        path="/",
    )

    return response


class LoginAPIView(APIView):
  """Login con CUIL/email y contrasenia."""

  throttle_classes = [ScopedRateThrottle]
  throttle_scope = "auth_login"

  def post(self, request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    usuario = serializer.validated_data["usuario"]

    payload = {
        "user_id": usuario.id_usuario,
        "persona_id": usuario.id_persona.persona,
        "exp": timezone.now() + timedelta(hours=2),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    # Datos adicionales del usuario para el frontend
    usuario_data = {
        "id": usuario.id_usuario,
        "cuil": usuario.cuil,
        "rol": getattr(usuario.id_rol, "nombre", None),
    }

    # Creamos la respuesta JSON con el payload del usuario
    response = Response(
        {"mensaje": "Login exitoso", "usuario": usuario_data},
        status=status.HTTP_200_OK,
    )

    # Inyectamos la cookie HttpOnly
    response.set_cookie(
        key="auth_token",
        value=token,
        httponly=True,
        secure=False,  # True en producción con HTTPS
        samesite="Lax",
        max_age=7200,
        path="/",
    )

    return response