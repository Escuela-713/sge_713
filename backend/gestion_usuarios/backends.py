from django.contrib.auth.backends import BaseBackend

from .models import Usuario


class DNIAuthenticationBackend(BaseBackend):
    def authenticate(self, request, username=None, dni=None, password=None, **kwargs):
        identificador = dni or username

        if not identificador or not password:
            return None

        try:
            usuario = Usuario.objects.select_related("id_persona").get(
                id_persona__dni=identificador
            )
        except Usuario.DoesNotExist:
            return None

        if usuario.is_active and usuario.check_password(password):
            return usuario

        return None

    def get_user(self, user_id):
        try:
            return Usuario.objects.select_related("id_persona").get(pk=user_id)
        except Usuario.DoesNotExist:
            return None

