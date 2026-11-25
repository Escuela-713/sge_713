
from rest_framework.permissions import BasePermission


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


class TieneRol(BasePermission):
    """
    Permite el acceso a usuarios que tengan al menos uno
    de los roles indicados en la vista mediante roles_permitidos.

    El superusuario puede acceder independientemente de sus roles.
    """

    message = "No tenés el rol necesario para acceder a este recurso."

    def tiene_acceso(self, request, view):
        usuario = request.user

        if not usuario or not usuario.is_authenticated:
            return False

        if usuario.is_superuser:
            return True

        roles_requeridos = getattr(view, "roles_permitidos", ())

        # También permitimos indicar un único rol como texto.
        if isinstance(roles_requeridos, str):
            roles_requeridos = (roles_requeridos,)

        # Si la vista no define roles, el acceso se rechaza.
        if not roles_requeridos:
            return False

        return usuario.id_persona.roles.filter(
            rol__in=roles_requeridos
        ).exists()

    def has_permission(self, request, view):
        return self.tiene_acceso(request, view)

    def has_object_permission(self, request, view, obj):
        return self.tiene_acceso(request, view)
