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
            response.set_cookie(
                key="refresh_token",
                value=tokens["refresh"],
                httponly=True,
                secure=False,  # Cambiar a True cuando uses HTTPS
                samesite="Lax",
                max_age=86400,
                path="/api/v1/auth/",
            )

        return response

class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                pass

        response = Response(
            {"mensaje": "Sesión cerrada correctamente."},
            status=status.HTTP_200_OK,
        )

        response.delete_cookie(
            key="refresh_token",
            path="/api/v1/auth/",
            samesite="Lax",
        )

        return response
