from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from django.conf import settings
import jwt

from .models import Usuario


class JWTAuthentication(BaseAuthentication):
    """Autenticación simple basada en JWT ( Authorization: Bearer <token> ).

    Devuelve la instancia de `Usuario` como `request.user` si el token es válido.
    """

    keyword = 'Bearer'

    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2:
            raise exceptions.AuthenticationFailed('Cabecera Authorization inválida')

        if parts[0] != self.keyword:
            return None

        token = parts[1]

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token expirado')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Token inválido')

        user_id = payload.get('user_id')
        if not user_id:
            raise exceptions.AuthenticationFailed('Token inválido: falta user_id')

        try:
            usuario = Usuario.objects.get(id_usuario=user_id)
        except Usuario.DoesNotExist:
            raise exceptions.AuthenticationFailed('Usuario no encontrado')

        # `authenticate` returns a tuple (user, auth) where `auth` is the token
        return (usuario, token)
