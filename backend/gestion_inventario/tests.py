from datetime import date, timedelta
from io import BytesIO

from django.db.models import ProtectedError
from django.test import TestCase
from openpyxl import load_workbook
from rest_framework.test import APITestCase

from .models import Bienes, Categoria, DetalleInventario, RegistroInventario, Ubicacion

URL_BIENES = '/api/v1/inventario/bienes/'


def datos_bien(**extra):
    datos = {
        'nombre': 'Sillas', 'categoria': 'Mobiliario', 'ubicacion': 'Aula 3ro',
        'estado': 'Bueno', 'cantidad': 12, 'descripcion': 'Sillas de madera',
        'codigo_especial': 'Sill-004', 'fecha_adquisicion': '2020-08-01',
    }
    datos.update(extra)
    return datos


def crear_bien(**extra):
    base = dict(
        nombre='Mesa', categoria=Categoria.objects.get_or_create(nombre='Mobiliario')[0],
        ubicacion=Ubicacion.objects.get_or_create(nombre='Aula 1')[0],
        estado='Bueno', cantidad=5,
    )
    base.update(extra)
    return Bienes.objects.create(**base)


class ModelosTests(TestCase):
    def test_no_se_borra_categoria_en_uso(self):
        bien = crear_bien()
        with self.assertRaises(ProtectedError):
            bien.categoria.delete()

    def test_no_se_borra_bien_con_movimientos(self):
        bien = crear_bien()
        registro = RegistroInventario.objects.create(fecha=date.today(), tipo=1)
        DetalleInventario.objects.create(id_inventario=registro, id_bien=bien, cantidad=1)
        with self.assertRaises(ProtectedError):
            bien.delete()


class BienesApiTests(APITestCase):
    def test_crear_bien_ok(self):
        r = self.client.post(URL_BIENES, datos_bien(), format='json')
        self.assertEqual(r.status_code, 201)
        self.assertEqual(r.data['message'], 'Registro de nuevo bien')
        self.assertEqual(r.data['data']['categoria'], 'Mobiliario')
        self.assertTrue(Categoria.objects.filter(nombre='Mobiliario').exists())

    def test_ruta_anterior_crear_sigue_andando(self):
        r = self.client.post(URL_BIENES + 'crear/', datos_bien(), format='json')
        self.assertEqual(r.status_code, 201)

    def test_reutiliza_categoria_existente(self):
        self.client.post(URL_BIENES, datos_bien(), format='json')
        self.client.post(URL_BIENES, datos_bien(codigo_especial='Sill-005', categoria='mobiliario'), format='json')
        self.assertEqual(Categoria.objects.count(), 1)

    def test_campos_obligatorios(self):
        r = self.client.post(URL_BIENES, {}, format='json')
        self.assertEqual(r.status_code, 400)
        for campo in ('nombre', 'categoria', 'ubicacion', 'estado', 'cantidad'):
            self.assertEqual(r.data[campo][0], 'Falta dato obligatorio', campo)

    def test_cantidad_minima(self):
        r = self.client.post(URL_BIENES, datos_bien(cantidad=0), format='json')
        self.assertEqual(r.status_code, 400)
        self.assertEqual(r.data['cantidad'][0], 'La cantidad debe ser al menos 1.')

    def test_nombre_corto_y_estado_invalido(self):
        r = self.client.post(URL_BIENES, datos_bien(nombre='ab', estado='Roto'), format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('al menos 3', r.data['nombre'][0])
        self.assertIn('no es un estado válido', r.data['estado'][0])

    def test_error_no_crea_categoria_huerfana(self):
        self.client.post(URL_BIENES, datos_bien(cantidad=0, categoria='Nueva'), format='json')
        self.assertFalse(Categoria.objects.filter(nombre='Nueva').exists())

    def test_codigo_especial_unico(self):
        self.client.post(URL_BIENES, datos_bien(), format='json')
        r = self.client.post(URL_BIENES, datos_bien(), format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('código especial', r.data['codigo_especial'][0])

    def test_codigo_vacio_se_puede_repetir(self):
        self.client.post(URL_BIENES, datos_bien(codigo_especial=''), format='json')
        r = self.client.post(URL_BIENES, datos_bien(codigo_especial=''), format='json')
        self.assertEqual(r.status_code, 201)

    def test_fecha_futura(self):
        futura = (date.today() + timedelta(days=5)).isoformat()
        r = self.client.post(URL_BIENES, datos_bien(fecha_adquisicion=futura), format='json')
        self.assertEqual(r.status_code, 400)

    def test_listar_devuelve_array(self):
        crear_bien()
        r = self.client.get(URL_BIENES)
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.data, list)
        self.assertEqual(len(r.data), 1)

    def test_detalle(self):
        bien = crear_bien()
        r = self.client.get(f'{URL_BIENES}{bien.id_bien}/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.data['nombre'], 'Mesa')

    def test_busqueda(self):
        crear_bien(nombre='Proyector Epson', codigo_especial='Pyt-001')
        crear_bien(nombre='Mesa', estado='Malo')
        self.assertEqual(len(self.client.get(URL_BIENES, {'search': 'proyector'}).data), 1)
        self.assertEqual(len(self.client.get(URL_BIENES, {'search': 'Pyt-001'}).data), 1)
        self.assertEqual(len(self.client.get(URL_BIENES, {'search': 'malo'}).data), 1)
        self.assertEqual(len(self.client.get(URL_BIENES, {'search': 'mobiliario'}).data), 2)
        self.assertEqual(len(self.client.get(URL_BIENES, {'search': 'inexistente'}).data), 0)

    def test_filtros(self):
        a = crear_bien(nombre='A', fecha_adquisicion=date(2020, 1, 1))
        crear_bien(nombre='B', estado='Malo', fecha_adquisicion=date(2022, 1, 1),
                   categoria=Categoria.objects.create(nombre='Equipamiento'))
        self.assertEqual(len(self.client.get(URL_BIENES, {'estado': 'malo'}).data), 1)
        self.assertEqual(len(self.client.get(URL_BIENES, {'categoria': 'equipamiento'}).data), 1)
        self.assertEqual(len(self.client.get(URL_BIENES, {'categoria': a.categoria_id}).data), 1)
        self.assertEqual(len(self.client.get(URL_BIENES, {'fecha_desde': '2021-01-01'}).data), 1)
        self.assertEqual(len(self.client.get(URL_BIENES, {'fecha_hasta': '2020-12-31'}).data), 1)

    def test_filtro_fecha_invalida(self):
        r = self.client.get(URL_BIENES, {'fecha_desde': 'hola'})
        self.assertEqual(r.status_code, 400)

    def test_editar_patch(self):
        bien = crear_bien()
        r = self.client.patch(f'{URL_BIENES}{bien.id_bien}/', {'estado': 'Malo', 'cantidad': 8}, format='json')
        self.assertEqual(r.status_code, 200)
        bien.refresh_from_db()
        self.assertEqual((bien.estado, bien.cantidad), ('Malo', 8))

    def test_editar_mismo_codigo_no_da_error(self):
        bien = crear_bien(codigo_especial='X-1')
        r = self.client.patch(f'{URL_BIENES}{bien.id_bien}/', {'codigo_especial': 'X-1'}, format='json')
        self.assertEqual(r.status_code, 200)

    def test_no_bajar_cantidad_por_debajo_de_lo_prestado(self):
        bien = crear_bien(cantidad=5, prestado=3)
        r = self.client.patch(f'{URL_BIENES}{bien.id_bien}/', {'cantidad': 2}, format='json')
        self.assertEqual(r.status_code, 400)

    def test_prestado_no_se_edita_por_api(self):
        bien = crear_bien()
        self.client.patch(f'{URL_BIENES}{bien.id_bien}/', {'prestado': 3}, format='json')
        bien.refresh_from_db()
        self.assertEqual(bien.prestado, 0)

    def test_eliminar(self):
        bien = crear_bien()
        r = self.client.delete(f'{URL_BIENES}{bien.id_bien}/')
        self.assertEqual(r.status_code, 204)
        self.assertFalse(Bienes.objects.filter(pk=bien.pk).exists())

    def test_eliminar_con_movimientos_da_400(self):
        bien = crear_bien()
        registro = RegistroInventario.objects.create(fecha=date.today(), tipo=1)
        DetalleInventario.objects.create(id_inventario=registro, id_bien=bien, cantidad=1)
        r = self.client.delete(f'{URL_BIENES}{bien.id_bien}/')
        self.assertEqual(r.status_code, 400)
        self.assertTrue(Bienes.objects.filter(pk=bien.pk).exists())

    def test_bien_inexistente(self):
        self.assertEqual(self.client.get(f'{URL_BIENES}9999/').status_code, 404)


class CatalogosApiTests(APITestCase):
    def test_categorias_crud(self):
        r = self.client.post('/api/v1/inventario/categorias/', {'nombre': 'Libros'}, format='json')
        self.assertEqual(r.status_code, 201)
        r = self.client.post('/api/v1/inventario/categorias/', {'nombre': 'libros'}, format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('Ya existe', r.data['nombre'][0])
        self.assertEqual(len(self.client.get('/api/v1/inventario/categorias/').data), 1)

    def test_ubicaciones_listar(self):
        Ubicacion.objects.create(nombre='Biblioteca')
        r = self.client.get('/api/v1/inventario/ubicaciones/')
        self.assertEqual([u['nombre'] for u in r.data], ['Biblioteca'])

    def test_no_borrar_categoria_en_uso(self):
        bien = crear_bien()
        r = self.client.delete(f'/api/v1/inventario/categorias/{bien.categoria_id}/')
        self.assertEqual(r.status_code, 400)

    def test_estados(self):
        r = self.client.get('/api/v1/inventario/estados/')
        self.assertIn('Bueno', r.data)


class ReportesTests(APITestCase):
    def setUp(self):
        self.bien = crear_bien(nombre='Proyector', fecha_adquisicion=date(2021, 5, 1))
        crear_bien(nombre='Silla', estado='Malo', fecha_adquisicion=date(2019, 5, 1))
        registro = RegistroInventario.objects.create(
            fecha=date(2024, 3, 1), tipo=2, responsable='Ana', telefono='123', mail='a@b.com', destino='Aula 2')
        DetalleInventario.objects.create(id_inventario=registro, id_bien=self.bien, cantidad=1)

    def test_pdf_bienes(self):
        r = self.client.get('/api/v1/inventario/reportes/bienes/')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r['Content-Type'], 'application/pdf')
        self.assertTrue(r.content.startswith(b'%PDF'))
        self.assertIn('attachment', r['Content-Disposition'])

    def test_excel_bienes_con_filtro(self):
        r = self.client.get('/api/v1/inventario/reportes/bienes/', {'formato': 'excel', 'fecha_desde': '2020-01-01'})
        self.assertEqual(r.status_code, 200)
        hoja = load_workbook(BytesIO(r.content)).active
        filas = list(hoja.iter_rows(min_row=5, values_only=True))
        self.assertEqual(len(filas), 1)
        self.assertEqual(filas[0][0], 'Proyector')

    def test_excel_movimientos(self):
        r = self.client.get('/api/v1/inventario/reportes/movimientos/', {'formato': 'excel', 'categoria': 'Mobiliario'})
        self.assertEqual(r.status_code, 200)
        hoja = load_workbook(BytesIO(r.content)).active
        filas = list(hoja.iter_rows(min_row=5, values_only=True))
        self.assertEqual(len(filas), 1)
        self.assertEqual(filas[0][1], 'Egreso')

    def test_pdf_movimientos_filtro_sin_resultados(self):
        r = self.client.get('/api/v1/inventario/reportes/movimientos/', {'fecha_desde': '2030-01-01'})
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.content.startswith(b'%PDF'))

    def test_formato_invalido(self):
        r = self.client.get('/api/v1/inventario/reportes/bienes/', {'formato': 'word'})
        self.assertEqual(r.status_code, 400)

    def test_fechas_invertidas(self):
        r = self.client.get('/api/v1/inventario/reportes/bienes/', {'fecha_desde': '2024-01-01', 'fecha_hasta': '2023-01-01'})
        self.assertEqual(r.status_code, 400)