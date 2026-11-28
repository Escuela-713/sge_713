from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
)
from rest_framework_simplejwt.views import TokenRefreshView
from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
    PersonaUpdateSerializer,
)
from rest_framework_simplejwt.exceptions import TokenError

from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.generics import ListAPIView

from .models import Usuario
from .permissions import ROL_ADMIN, TieneRol
from .serializers import UsuarioAdminSerializer, UsuarioAdminUpdateSerializer

REFRESH_COOKIE = {"key": "refresh_token", "path": "/api/v1/auth/", "samesite": "Lax"}


def set_refresh_cookie(response, refresh):
    response.set_cookie(
        value=str(refresh),
        httponly=True,
        secure=False,  # Cambiar a True cuando uses HTTPS
        max_age=86400,
        **REFRESH_COOKIE,
    )


def delete_refresh_cookie(response):
    response.delete_cookie(**REFRESH_COOKIE)

def revocar_refresh_tokens(usuario):
    for token in OutstandingToken.objects.filter(user=usuario):
        BlacklistedToken.objects.get_or_create(token=token)


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth_register"

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        usuario = serializer.save()

        return Response(
            {
                "mensaje": "Registro exitoso",
                "usuario": UserSerializer(usuario).data,
            },
            status=status.HTTP_201_CREATED,
        )



class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth_login"

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)

        usuario = serializer.validated_data["usuario"]

        refresh = RefreshToken.for_user(usuario)

        response = Response(
            {
                "mensaje": "Login exitoso",
                "usuario": UserSerializer(usuario).data,
                "tokens": {
                    "access": str(refresh.access_token),
                },
            },
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,  # Cambiar a True cuando uses HTTPS
            samesite="Lax",
            max_age=86400,
            path="/api/v1/auth/",
        )

        return response



class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

class UpdateCurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        persona = request.user.id_persona
        serializer = PersonaUpdateSerializer(persona)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        campos_protegidos = {
            "roles",
            "is_active",
            "is_staff",
            "is_superuser",
            "groups",
            "user_permissions",
            "id_persona",
        }

        campos_enviados = campos_protegidos.intersection(request.data.keys())

        if campos_enviados:
            return Response(
                {
                    "error": "No podés modificar tus propios roles ni privilegios."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        persona = request.user.id_persona

        serializer = PersonaUpdateSerializer(
            persona,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {
                "mensaje": "Datos personales actualizados correctamente.",
                "usuario": UserSerializer(request.user).data,
                "datos_personales": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

class CookieTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "No se encontró el Refresh Token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = self.get_serializer(
            data={"refresh": refresh_token}
        )

        serializer.is_valid(raise_exception=True)

        tokens = serializer.validated_data

        response = Response(
            {"access": tokens["access"]},
            status=status.HTTP_200_OK,
        )

        # Si SimpleJWT rotó el Refresh Token, actualizamos la cookie.
        if "refresh" in tokens:
            set_refresh_cookie(response, tokens["refresh"])

        return response

class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token:
            try:
                RefreshToken(refresh_token).blacklist()
            except TokenError:
                pass  # ya expirado o revocado: igual se cierra la sesión

        response = Response(
            {"mensaje": "Sesión cerrada correctamente."},
            status=status.HTTP_200_OK,
        )
        delete_refresh_cookie(response)
        return response


class LogoutAllAPIView(APIView):
    """Revoca todos los refresh tokens del usuario (cierra todas sus sesiones)."""

    permission_classes = [IsAuthenticated]

    def post(self, request):

        revocar_refresh_tokens(request.user)
        response = Response(
            {"mensaje": "Todas las sesiones fueron cerradas."},
            status=status.HTTP_200_OK,
        )
        delete_refresh_cookie(response)
        return response
class UsuarioListView(ListAPIView):
    """Listado de usuarios. Solo administradores."""

    permission_classes = [TieneRol()]
    queryset = Usuario.objects.select_related("id_persona").order_by("id_usuario")
    serializer_class = UsuarioAdminSerializer


class UsuarioDetailView(APIView):
    """Detalle y administración (roles / activación) de un usuario. Solo administradores."""

    permission_classes = [TieneRol()]

    def get_usuario(self, pk):
        return get_object_or_404(Usuario.objects.select_related("id_persona"), pk=pk)

    def get(self, request, pk):
        return Response(UsuarioAdminSerializer(self.get_usuario(pk)).data)

    @transaction.atomic
    def patch(self, request, pk):
        usuario = self.get_usuario(pk)
        solicitante = request.user

        if usuario.pk == solicitante.pk:
            raise PermissionDenied("No podés modificar tus propios roles ni privilegios.")

        if usuario.is_superuser and not solicitante.is_superuser:
            raise PermissionDenied("No podés modificar a un superusuario.")

        serializer = UsuarioAdminUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        datos = serializer.validated_data

        no_permitidos = set(request.data) - set(serializer.fields)
        if no_permitidos:
            raise ValidationError(
                {"error": f"Campos no permitidos: {', '.join(sorted(no_permitidos))}."}
            )

        if "roles" in datos:
            actuales = set(usuario.id_persona.roles.values_list("rol", flat=True))
            nuevos = {rol.rol for rol in datos["roles"]}

            if ROL_ADMIN in (actuales ^ nuevos) and not solicitante.is_superuser:
                raise PermissionDenied(
                    "Solo un superusuario puede asignar o quitar el rol de administrador."
                )

            usuario.id_persona.roles.set(datos["roles"])

        if "is_active" in datos:
            usuario.is_active = datos["is_active"]
            usuario.save(update_fields=["is_active"])

            if not usuario.is_active:
                revocar_refresh_tokens(usuario)

        return Response(
            {
                "mensaje": "Usuario actualizado correctamente.",
                "usuario": UsuarioAdminSerializer(usuario).data,
            }
        )