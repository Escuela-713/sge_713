from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from django.conf import settings
import jwt

from .models import Usuario


class JWTAuthentication(BaseAuthentication):
    """Autenticación por JWT.
    Busca primero en cookies HttpOnly y luego en el header 'Authorization: Bearer <token>'.
    """

    keyword = "Bearer"

    def authenticate(self, request):
        token = None

        # 1. Intentar obtener el token desde la cookie HttpOnly
        token = request.COOKIES.get("auth_token")

        # 2. Si no hay cookie, buscar en la cabecera Authorization
        if not token:
            auth_header = request.META.get("HTTP_AUTHORIZATION")
            if auth_header:
                parts = auth_header.split()
                if len(parts) == 2 and parts[0] == self.keyword:
                    token = parts[1]

        # Si no hay token en ninguna parte, DRF pasa al siguiente método o devuelve 401
        if not token:
            return None

        # 3. Decodificar y validar el token
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed("Token expirado")
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed("Token inválido")

        user_id = payload.get("user_id")
        if not user_id:
            raise exceptions.AuthenticationFailed("Token inválido: falta user_id")

        try:
            usuario = Usuario.objects.get(id_usuario=user_id)
        except Usuario.DoesNotExist:
            raise exceptions.AuthenticationFailed("Usuario no encontrado")

        return (usuario, token)
