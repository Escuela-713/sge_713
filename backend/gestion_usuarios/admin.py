from django import forms
from django.contrib import admin
from django.contrib.auth.forms import AuthenticationForm

from gestion_datos_personales.models import Rol
from .models import Usuario


class DNIAdminAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        label="DNI",
        widget=forms.TextInput(attrs={"autofocus": True}),
    )


class UsuarioAdminForm(forms.ModelForm):
    roles = forms.ModelMultipleChoiceField(
        queryset=Rol.objects.all(),
        required=False,
        widget=forms.CheckboxSelectMultiple,
        label="Roles",
    )

    class Meta:
        model = Usuario
        fields = (
            "id_persona",
            "roles",
            "is_active",
            "is_staff",
            "is_superuser",
            "groups",
            "user_permissions",
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.instance and self.instance.pk:
            self.fields["roles"].initial = self.instance.id_persona.roles.all()

    def _save_m2m(self):
        super()._save_m2m()

        self.instance.id_persona.roles.set(self.cleaned_data["roles"])


admin.site.login_form = DNIAdminAuthenticationForm


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    form = UsuarioAdminForm

    list_display = (
        "id_usuario",
        "mostrar_dni",
        "mostrar_nombre",
        "mostrar_roles",
        "is_active",
        "is_staff",
        "is_superuser",
    )

    list_filter = (
        "is_active",
        "is_staff",
        "is_superuser",
    )

    search_fields = (
        "id_persona__dni",
        "id_persona__primer_nombre",
        "id_persona__primer_apellido",
    )

    readonly_fields = ("last_login",)

    fields = (
        "id_persona",
        "roles",
        "is_active",
        "is_staff",
        "is_superuser",
        "groups",
        "user_permissions",
        "last_login",
    )

    filter_horizontal = ("groups", "user_permissions")

    def mostrar_dni(self, obj):
        return obj.id_persona.dni

    mostrar_dni.short_description = "DNI"

    def mostrar_nombre(self, obj):
        return f"{obj.id_persona.primer_nombre} {obj.id_persona.primer_apellido}"

    mostrar_nombre.short_description = "Nombre"

    def mostrar_roles(self, obj):
        roles = list(obj.id_persona.roles.values_list("rol", flat=True))

        return ", ".join(roles) if roles else "Invitado"

    mostrar_roles.short_description = "Roles"

    
    def get_form(self, request, obj=None, **kwargs):
        form_class = super().get_form(request, obj, **kwargs)

        if obj is not None and obj.pk == request.user.pk:

            class FormularioPropiaCuentaProtegido(form_class):

                def __init__(self, *args, **form_kwargs):
                    super().__init__(*args, **form_kwargs)

                    campos_protegidos = (
                        "id_persona",
                        "roles",
                        "is_active",
                        "is_staff",
                        "is_superuser",
                        "groups",
                        "user_permissions",
                    )

                    for campo in campos_protegidos:
                        if campo in self.fields:
                            self.fields[campo].disabled = True

            return FormularioPropiaCuentaProtegido

        return form_class
    def has_module_permission(self, request):
        return request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
    def has_add_permission(self, request):
        return False
