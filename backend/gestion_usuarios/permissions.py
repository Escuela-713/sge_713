from rest_framework.permissions import SAFE_METHODS, BasePermission

ROL_ADMIN = "administradores"


class EsAdministradorSGE(BasePermission):
    """
    Permite el acceso únicamente al superusuario del SGE.
    """

    message = "Necesitás permisos de administrador para realizar esta operación."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )


def _tiene_rol(user, roles):
    if not (user and user.is_authenticated):
        return False
    if user.is_superuser:
        return True
    return user.id_persona.roles.filter(rol__in=(ROL_ADMIN, *roles)).exists()


def TieneRol(*roles):
    """Solo usuarios con alguno de los roles (los administradores siempre pasan)."""

    class _TieneRol(BasePermission):
        message = "No tenés el rol necesario para acceder a este recurso."

        def has_permission(self, request, view):
            return _tiene_rol(request.user, roles)

    return _TieneRol


def LecturaPublicaEscrituraConRol(*roles):
    """GET/HEAD/OPTIONS públicos; el resto de métodos requiere alguno de los roles."""

    class _LecturaPublica(BasePermission):
        message = "No tenés el rol necesario para modificar este recurso."

        def has_permission(self, request, view):
            return request.method in SAFE_METHODS or _tiene_rol(request.user, roles)

    return _LecturaPublica
