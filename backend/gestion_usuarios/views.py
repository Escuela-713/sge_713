from datetime import timedelta
import jwt
from django.conf import settings
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from .authentication import JWTAuthentication
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer


def crear_cookie_autenticacion(response, usuario):
    payload = {
        "user_id": usuario.id_usuario,
        "exp": timezone.now() + timedelta(hours=2),
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    response.set_cookie(
        key="auth_token",
        value=token,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="Lax",
        max_age=7200,
        path="/",
    )

    return response


class RegisterAPIView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth_register"

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        usuario = serializer.save()

        response = Response(
            {"mensaje": "Registro exitoso", "usuario": UserSerializer(usuario).data},
            status=status.HTTP_201_CREATED,
        )

        return crear_cookie_autenticacion(response, usuario)


class LoginAPIView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth_login"

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)

        usuario = serializer.validated_data["usuario"]

        response = Response(
            {"mensaje": "Login exitoso", "usuario": UserSerializer(usuario).data},
            status=status.HTTP_200_OK,
        )

        return crear_cookie_autenticacion(response, usuario)


class CurrentUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
