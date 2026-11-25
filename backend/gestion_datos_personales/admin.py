
from django.contrib import admin
from .models import Persona, Alumno, Rol, Tutor


@admin.register(Rol)
class RolAdmin(admin.ModelAdmin):

    def has_module_permission(self, request):
        return request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


@admin.register(Persona)
class PersonaAdmin(admin.ModelAdmin):

    def get_form(self, request, obj=None, **kwargs):
        form_class = super().get_form(request, obj, **kwargs)

        es_propio_usuario = (
            obj is not None
            and obj.pk == getattr(request.user, "id_persona_id", None)
        )

        if not request.user.is_superuser or es_propio_usuario:

            class FormularioPersonaProtegido(form_class):

                def __init__(self, *args, **form_kwargs):
                    super().__init__(*args, **form_kwargs)

                    if "roles" in self.fields:
                        self.fields["roles"].disabled = True

            return FormularioPersonaProtegido

        return form_class


admin.site.register(Alumno)
admin.site.register(Tutor)
