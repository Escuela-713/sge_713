from .admin import PersonaAdmin, RolAdmin
from .models import Persona, Rol
from datetime import date

from django.contrib.admin.sites import AdminSite
from django.test import TestCase, RequestFactory

from .admin import PersonaAdmin
from .models import Persona
from gestion_usuarios.models import Usuario


class PersonaAdminProteccionRolesTests(TestCase):

    def crear_persona(self, dni, email, nombre):
        return Persona.objects.create(
            primer_nombre=nombre,
            segundo_nombre="",
            tercer_nombre="",
            primer_apellido="Prueba",
            segundo_apellido="",
            fecha_nacimiento=date(2000, 1, 1),
            email=email,
            telefono="123456789",
            genero=Persona.Genero.MASCULINO,
            dni=dni,
            tipo_sangre=None,
            calle="Mitre",
            numero_calle=123,
            barrio="Centro",
            id_localidad=100,
            id_localidad_nacimiento=100,
        )

    def setUp(self):
        self.persona_admin = self.crear_persona(
            "11111111", "admin@test.com", "Administrador"
        )

        self.otra_persona = self.crear_persona(
            "22222222", "otro@test.com", "Otro"
        )

        self.usuario_admin = Usuario.objects.create_user(
            id_persona=self.persona_admin,
            password="AdminSeguro123!",
        )

        self.usuario_admin.is_staff = True
        self.usuario_admin.is_superuser = True
        self.usuario_admin.save(
            update_fields=["is_staff", "is_superuser"]
        )

        self.request = RequestFactory().get("/admin/")
        self.request.user = self.usuario_admin

        self.admin = PersonaAdmin(Persona, AdminSite())

    def test_usuario_no_puede_modificar_sus_propios_roles(self):
        form_class = self.admin.get_form(
            self.request,
            self.persona_admin,
        )

        form = form_class(instance=self.persona_admin)

        self.assertTrue(form.fields["roles"].disabled)

    def test_usuario_puede_modificar_roles_de_otra_persona(self):
        form_class = self.admin.get_form(
            self.request,
            self.otra_persona,
        )

        form = form_class(instance=self.otra_persona)

        self.assertFalse(form.fields["roles"].disabled)

class AdministracionRolesTests(TestCase):

    def crear_persona(self, dni, email, nombre):
        return Persona.objects.create(
            primer_nombre=nombre,
            segundo_nombre="",
            tercer_nombre="",
            primer_apellido="Prueba",
            segundo_apellido="",
            fecha_nacimiento=date(2000, 1, 1),
            email=email,
            telefono="123456789",
            genero=Persona.Genero.MASCULINO,
            dni=dni,
            tipo_sangre=None,
            calle="Mitre",
            numero_calle=123,
            barrio="Centro",
            id_localidad=100,
            id_localidad_nacimiento=100,
        )

    def setUp(self):
        persona_comun = self.crear_persona(
            "33333333", "comun@test.com", "Usuario"
        )

        persona_admin = self.crear_persona(
            "44444444", "admin@test.com", "Administrador"
        )

        self.persona_destino = self.crear_persona(
            "55555555", "destino@test.com", "Destino"
        )

        self.usuario_comun = Usuario.objects.create_user(
            id_persona=persona_comun,
            password="UsuarioSeguro123!",
        )
        self.usuario_comun.is_staff = True
        self.usuario_comun.save(update_fields=["is_staff"])

        self.superusuario = Usuario.objects.create_user(
            id_persona=persona_admin,
            password="AdminSeguro123!",
        )
        self.superusuario.is_staff = True
        self.superusuario.is_superuser = True
        self.superusuario.save(
            update_fields=["is_staff", "is_superuser"]
        )

        self.persona_admin = PersonaAdmin(Persona, AdminSite())
        self.rol_admin = RolAdmin(Rol, AdminSite())

    def test_usuario_comun_no_puede_editar_roles_de_otra_persona(self):
        request = RequestFactory().get("/admin/")
        request.user = self.usuario_comun

        form_class = self.persona_admin.get_form(
            request,
            self.persona_destino,
        )
        form = form_class(instance=self.persona_destino)

        self.assertTrue(form.fields["roles"].disabled)

    def test_superusuario_puede_editar_roles_de_otra_persona(self):
        request = RequestFactory().get("/admin/")
        request.user = self.superusuario

        form_class = self.persona_admin.get_form(
            request,
            self.persona_destino,
        )
        form = form_class(instance=self.persona_destino)

        self.assertFalse(form.fields["roles"].disabled)

    def test_usuario_comun_no_puede_administrar_catalogo_roles(self):
        request = RequestFactory().get("/admin/")
        request.user = self.usuario_comun

        self.assertFalse(self.rol_admin.has_module_permission(request))
        self.assertFalse(self.rol_admin.has_view_permission(request))
        self.assertFalse(self.rol_admin.has_add_permission(request))
        self.assertFalse(self.rol_admin.has_change_permission(request))
        self.assertFalse(self.rol_admin.has_delete_permission(request))

    def test_superusuario_puede_administrar_catalogo_roles(self):
        request = RequestFactory().get("/admin/")
        request.user = self.superusuario

        self.assertTrue(self.rol_admin.has_module_permission(request))
        self.assertTrue(self.rol_admin.has_view_permission(request))
        self.assertTrue(self.rol_admin.has_add_permission(request))
        self.assertTrue(self.rol_admin.has_change_permission(request))
        self.assertTrue(self.rol_admin.has_delete_permission(request))
