from datetime import timedelta
from django.conf import settings
from django.utils import timezone
import jwt
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from .authentication import JWTAuthentication
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer


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
            "persona_id": usuario.id_persona.pk,  # Usamos .pk para asegurar el ID de la persona
            "exp": timezone.now() + timedelta(hours=2),
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        usuario_data = {
            "id": usuario.id_usuario,
            "cuil": usuario.id_persona.dni,
            "nombre": f"{usuario.id_persona.primer_nombre} {usuario.id_persona.primer_apellido}",
            "rol": getattr(usuario, "rol", None) or "Usuario",
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
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=7200,
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
            "persona_id": usuario.id_persona.pk,
            "exp": timezone.now() + timedelta(hours=2),
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        usuario_data = {
            "id": usuario.id_usuario,
            "cuil": usuario.id_persona.dni,
            "nombre": f"{usuario.id_persona.primer_nombre} {usuario.id_persona.primer_apellido}",
            "rol": getattr(usuario, "rol", None) or "Usuario",
        }

        response = Response(
            {"mensaje": "Login exitoso", "usuario": usuario_data},
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
            key="auth_token",
            value=token,
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=7200,
            path="/",
        )

        return response


class CurrentUserView(APIView):
    """Devuelve los datos del usuario autenticado."""

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
