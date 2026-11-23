
from datetime import date

from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from gestion_datos_personales.models import Persona, Rol
from .models import Usuario
from django.contrib.admin.sites import AdminSite
from django.test import RequestFactory, TestCase
from .admin import UsuarioAdmin

class SeguridadPrivilegiosTests(APITestCase):

    def setUp(self):
        # Creamos un rol de ejemplo.
        self.rol = Rol.objects.create(rol="Alumno")

        # Creamos una persona.
        self.persona = Persona.objects.create(
            primer_nombre="Usuario",
            segundo_nombre="",
            tercer_nombre="",
            primer_apellido="Prueba",
            segundo_apellido="",
            fecha_nacimiento=date(2000, 1, 1),
            email="usuario@test.com",
            telefono="123456789",
            genero=Persona.Genero.MASCULINO,
            dni="12345678",
            tipo_sangre=None,
            calle="Mitre",
            numero_calle=123,
            barrio="Centro",
            id_localidad=100,
            id_localidad_nacimiento=100,
        )

        # Asignamos el rol a la persona.
        self.persona.roles.add(self.rol)

        # Creamos su usuario.
        self.usuario = Usuario.objects.create_user(
            id_persona=self.persona,
            password="PruebaSegura123!",
        )

        # Autenticamos las peticiones como ese usuario.
        self.client.force_authenticate(user=self.usuario)

        self.url = reverse("update-current-user")

    def test_usuario_puede_modificar_sus_datos_personales(self):
        response = self.client.patch(
            self.url,
            {"primer_nombre": "NombreModificado"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.persona.refresh_from_db()

        self.assertEqual(
            self.persona.primer_nombre,
            "NombreModificado",
        )

    def test_usuario_no_puede_modificar_sus_roles(self):
        response = self.client.patch(
            self.url,
            {"roles": [self.rol.id_rol]},
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertEqual(
            list(self.persona.roles.values_list("id_rol", flat=True)),
            [self.rol.id_rol],
        )

    def test_usuario_no_puede_modificar_sus_privilegios(self):
        intentos = [
            {"is_superuser": True},
            {"is_staff": True},
            {"is_active": False},
            {"groups": []},
            {"user_permissions": []},
            {"id_persona": 999},
        ]

        for intento in intentos:
            with self.subTest(intento=intento):
                response = self.client.patch(
                    self.url,
                    intento,
                    format="json",
                )

                self.assertEqual(
                    response.status_code,
                    status.HTTP_403_FORBIDDEN,
                )

        self.usuario.refresh_from_db()

        self.assertFalse(self.usuario.is_superuser)
        self.assertFalse(self.usuario.is_staff)
        self.assertTrue(self.usuario.is_active)

    def test_rechaza_privilegios_y_datos_personales_en_la_misma_peticion(self):
        response = self.client.patch(
            self.url,
            {
                "primer_nombre": "NombreNoPermitido",
                "is_superuser": True,
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.persona.refresh_from_db()

        self.assertEqual(
            self.persona.primer_nombre,
            "Usuario",
        )

class UsuarioAdminProteccionTests(TestCase):

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
        persona_admin = self.crear_persona(
            "11111111", "admin@test.com", "Administrador"
        )
        persona_otro = self.crear_persona(
            "22222222", "otro@test.com", "Otro"
        )

        self.usuario_admin = Usuario.objects.create_user(
            id_persona=persona_admin,
            password="AdminSeguro123!",
        )

        self.usuario_admin.is_staff = True
        self.usuario_admin.is_superuser = True
        self.usuario_admin.save(
            update_fields=["is_staff", "is_superuser"]
        )

        self.otro_usuario = Usuario.objects.create_user(
            id_persona=persona_otro,
            password="UsuarioSeguro123!",
        )

        self.request = RequestFactory().get("/admin/")
        self.request.user = self.usuario_admin

        self.admin = UsuarioAdmin(Usuario, AdminSite())

    def test_administrador_no_puede_editar_sus_propios_privilegios(self):
        form_class = self.admin.get_form(
            self.request,
            self.usuario_admin,
        )

        form = form_class(instance=self.usuario_admin)

        campos_protegidos = [
            "id_persona",
            "roles",
            "is_active",
            "is_staff",
            "is_superuser",
            "groups",
            "user_permissions",
        ]

        for campo in campos_protegidos:
            with self.subTest(campo=campo):
                self.assertTrue(
                    form.fields[campo].disabled,
                    f"El campo {campo} debería estar deshabilitado.",
                )

    def test_administrador_puede_editar_privilegios_de_otro_usuario(self):
        form_class = self.admin.get_form(
            self.request,
            self.otro_usuario,
        )

        form = form_class(instance=self.otro_usuario)

        campos_protegidos = [
            "roles",
            "is_active",
            "is_staff",
            "is_superuser",
            "groups",
            "user_permissions",
        ]

        for campo in campos_protegidos:
            with self.subTest(campo=campo):
                self.assertFalse(
                    form.fields[campo].disabled,
                    f"El campo {campo} debería estar habilitado.",
                )
    def test_usuario_comun_no_puede_administrar_cuentas(self):
        request = RequestFactory().get("/admin/")
        request.user = self.otro_usuario

        self.assertFalse(self.admin.has_module_permission(request))
        self.assertFalse(self.admin.has_view_permission(request))
        self.assertFalse(self.admin.has_change_permission(request))
        self.assertFalse(self.admin.has_delete_permission(request))
        self.assertFalse(self.admin.has_add_permission(request))