from datetime import date
from html import escape
from io import BytesIO

from django.conf import settings
from django.db.models import ProtectedError
from django.http import HttpResponse
from django.utils import timezone
from openpyxl import Workbook
from openpyxl.styles import Font
from openpyxl.utils import get_column_letter
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from rest_framework import filters, status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import SAFE_METHODS, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Bienes, Categoria, DetalleInventario, Ubicacion
from .serializers import BienesSerializer, CategoriaSerializer, UbicacionSerializer

TIPOS_MOVIMIENTO = {1: 'Ingreso', 2: 'Egreso'}  # ajustar si T10 usa otros valores


# ---------- Permisos ----------

def es_admin(user):
    return bool(
        user and user.is_authenticated
        and (user.is_superuser or user.groups.filter(name='Administrador').exists())
    )


class SegunRol(BasePermission):
    """
    - Administrador: puede todo.
    - Usuario estándar: puede ver, crear y editar, pero no eliminar.
    Si EXIGIR_LOGIN es False (settings), no se pide login (modo desarrollo).
    Provisorio: se adapta a los roles de gestion_usuarios cuando los veamos.
    """
    message = 'No tenés permiso para realizar esta acción.'

    def has_permission(self, request, view):
        if not getattr(settings, 'EXIGIR_LOGIN', False):
            return True
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if request.method in SAFE_METHODS or es_admin(user):
            return True
        return request.method != 'DELETE'


# ---------- Generación de archivos (PDF / Excel) ----------

def generar_excel(titulo, filtros, encabezados, filas):
    libro = Workbook()
    hoja = libro.active
    hoja.title = 'Reporte'
    hoja.append([titulo])
    hoja['A1'].font = Font(bold=True, size=14)
    hoja.append([filtros])
    hoja.append([])
    hoja.append(encabezados)
    for celda in hoja[4]:
        celda.font = Font(bold=True)
    for fila in filas:
        hoja.append(list(fila))
    for i, encabezado in enumerate(encabezados, start=1):
        ancho = max(len(str(encabezado)), *(len(str(f[i - 1])) for f in filas)) if filas else len(str(encabezado))
        hoja.column_dimensions[get_column_letter(i)].width = min(ancho + 3, 45)
    salida = BytesIO()
    libro.save(salida)
    return salida.getvalue()


def generar_pdf(titulo, filtros, encabezados, filas):
    salida = BytesIO()
    doc = SimpleDocTemplate(salida, pagesize=landscape(A4), leftMargin=24, rightMargin=24,
                            topMargin=24, bottomMargin=24, title=titulo)
    estilos = getSampleStyleSheet()
    celda = estilos['BodyText']
    celda.fontSize = 8
    celda.leading = 10
    elementos = [
        Paragraph(escape(titulo), estilos['Title']),
        Paragraph(escape(filtros), estilos['Normal']),
        Spacer(1, 10),
    ]
    datos = [[Paragraph(f'<b>{escape(h)}</b>', celda) for h in encabezados]]
    for fila in filas:
        datos.append([Paragraph(escape(str(v)), celda) for v in fila])
    if not filas:
        elementos.append(Paragraph('No hay datos para los filtros elegidos.', estilos['Normal']))
    else:
        tabla = Table(datos, repeatRows=1)
        tabla.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 0.4, colors.grey),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        elementos.append(tabla)
    doc.build(elementos)
    return salida.getvalue()


def exportar(formato, nombre_archivo, titulo, filtros, encabezados, filas):
    hoy = timezone.localdate().isoformat()
    if formato == 'excel':
        contenido = generar_excel(titulo, filtros, encabezados, filas)
        tipo = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        extension = 'xlsx'
    else:
        contenido = generar_pdf(titulo, filtros, encabezados, filas)
        tipo = 'application/pdf'
        extension = 'pdf'
    respuesta = HttpResponse(contenido, content_type=tipo)
    respuesta['Content-Disposition'] = f'attachment; filename="{nombre_archivo}_{hoy}.{extension}"'
    return respuesta


# ---------- Utilidades ----------

def _fecha(params, nombre):
    valor = params.get(nombre)
    if not valor:
        return None
    try:
        return date.fromisoformat(valor)
    except ValueError:
        raise ValidationError({nombre: 'Fecha inválida, usá el formato AAAA-MM-DD.'})


def aplicar_filtros(queryset, params, prefijo='', campo_fecha='fecha_adquisicion'):
    """
    Filtros por query params: categoria, ubicacion (id o nombre), estado,
    fecha_desde, fecha_hasta (AAAA-MM-DD). `prefijo` sirve para filtrar por el bien
    desde otra tabla (ej: 'id_bien__').
    """
    for campo in ('categoria', 'ubicacion'):
        valor = params.get(campo)
        if valor:
            if valor.isdigit():
                queryset = queryset.filter(**{f'{prefijo}{campo}_id': int(valor)})
            else:
                queryset = queryset.filter(**{f'{prefijo}{campo}__nombre__iexact': valor})
    estado = params.get('estado')
    if estado:
        queryset = queryset.filter(**{f'{prefijo}estado__iexact': estado})
    desde, hasta = _fecha(params, 'fecha_desde'), _fecha(params, 'fecha_hasta')
    if desde and hasta and desde > hasta:
        raise ValidationError({'fecha_desde': 'La fecha desde no puede ser posterior a la fecha hasta.'})
    if desde:
        queryset = queryset.filter(**{f'{campo_fecha}__gte': desde})
    if hasta:
        queryset = queryset.filter(**{f'{campo_fecha}__lte': hasta})
    return queryset


def describir_filtros(params):
    partes = []
    for clave, etiqueta in (('categoria', 'Categoría'), ('ubicacion', 'Ubicación'), ('estado', 'Estado'),
                            ('fecha_desde', 'Desde'), ('fecha_hasta', 'Hasta')):
        if params.get(clave):
            partes.append(f'{etiqueta}: {params[clave]}')
    filtros = ' | '.join(partes) if partes else 'Sin filtros'
    return f'{filtros} — Generado el {timezone.localdate().strftime("%d/%m/%Y")}'


class EliminacionProtegidaMixin:
    permission_classes = [SegunRol]
    mensaje_protegido = 'No se puede eliminar porque tiene registros asociados.'

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response({'detail': self.mensaje_protegido}, status=status.HTTP_400_BAD_REQUEST)


# ---------- Bienes (T03) ----------

class BienesViewSet(EliminacionProtegidaMixin, viewsets.ModelViewSet):
    """
    GET    /api/v1/inventario/bienes/            lista (?search=, ?categoria=, ?ubicacion=, ?estado=,
                                              ?fecha_desde=, ?fecha_hasta=, ?ordering=)
    POST   /api/v1/inventario/bienes/            alta  (también en /api/v1/inventario/bienes/crear/)
    GET    /api/v1/inventario/bienes/<id>/       detalle
    PATCH  /api/v1/inventario/bienes/<id>/       edición parcial (PUT: completa)
    DELETE /api/v1/inventario/bienes/<id>/       baja
    """
    queryset = Bienes.objects.select_related('categoria', 'ubicacion')
    serializer_class = BienesSerializer
    pagination_class = None  # devuelve un array simple, como espera el frontend
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'categoria__nombre', 'ubicacion__nombre',
                     'codigo_especial', 'estado', 'descripcion']
    ordering_fields = ['nombre', 'cantidad', 'estado', 'fecha_adquisicion', 'id_bien']
    mensaje_protegido = 'No se puede eliminar el bien porque tiene movimientos registrados.'

    def get_queryset(self):
        return aplicar_filtros(super().get_queryset(), self.request.query_params)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'Registro de nuevo bien', 'data': serializer.data},
                        status=status.HTTP_201_CREATED)


# ---------- Categorías, ubicaciones y estados (T07a) ----------

class CategoriaViewSet(EliminacionProtegidaMixin, viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    pagination_class = None
    mensaje_protegido = 'No se puede eliminar la categoría porque hay bienes que la usan.'


class UbicacionViewSet(EliminacionProtegidaMixin, viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer
    pagination_class = None
    mensaje_protegido = 'No se puede eliminar la ubicación porque hay bienes que la usan.'


class EstadosView(APIView):
    """GET /api/v1/inventario/estados/ -> ["Bueno", "Regular", ...]"""
    permission_classes = [SegunRol]

    def get(self, request):
        return Response([valor for valor, _ in Bienes.ESTADOS])


# ---------- Reportes (T16a) ----------

def _formato(request):
    formato = request.query_params.get('formato', 'pdf').lower()
    if formato not in ('pdf', 'excel'):
        raise ValidationError({'formato': 'Formato inválido. Usá "pdf" o "excel".'})
    return formato


class ReporteBienesView(APIView):
    """GET /api/v1/inventario/reportes/bienes/?formato=pdf|excel&categoria=&ubicacion=&estado=&fecha_desde=&fecha_hasta="""
    permission_classes = [SegunRol]

    def get(self, request):
        formato = _formato(request)
        params = request.query_params
        bienes = aplicar_filtros(
            Bienes.objects.select_related('categoria', 'ubicacion').order_by('nombre'), params)
        encabezados = ['Nombre', 'Categoría', 'Cantidad', 'Código especial', 'Estado',
                       'Ubicación', 'Fecha de adquisición', 'Prestado']
        filas = [[b.nombre, str(b.categoria or ''), b.cantidad, b.codigo_especial or '', b.estado,
                  str(b.ubicacion or ''), b.fecha_adquisicion.strftime('%d/%m/%Y') if b.fecha_adquisicion else '',
                  b.prestado] for b in bienes]
        return exportar(formato, 'reporte_bienes', 'Reporte de bienes', describir_filtros(params),
                        encabezados, filas)


class ReporteMovimientosView(APIView):
    """GET /api/v1/inventario/reportes/movimientos/?formato=pdf|excel&categoria=&ubicacion=&fecha_desde=&fecha_hasta="""
    permission_classes = [SegunRol]

    def get(self, request):
        formato = _formato(request)
        params = request.query_params
        detalles = DetalleInventario.objects.select_related(
            'id_inventario', 'id_bien__categoria', 'id_bien__ubicacion'
        ).order_by('-id_inventario__fecha', '-pk')
        detalles = aplicar_filtros(detalles, params, prefijo='id_bien__', campo_fecha='id_inventario__fecha')
        encabezados = ['Fecha', 'Tipo', 'Bien', 'Categoría', 'Cantidad', 'Responsable',
                       'Contacto', 'Teléfono', 'Mail', 'Destino']
        filas = []
        for d in detalles:
            r = d.id_inventario
            filas.append([
                r.fecha.strftime('%d/%m/%Y') if r.fecha else '',
                TIPOS_MOVIMIENTO.get(r.tipo, r.tipo if r.tipo is not None else ''),
                d.id_bien.nombre, str(d.id_bien.categoria or ''), d.cantidad if d.cantidad is not None else '',
                r.responsable or '', r.contacto or '', r.telefono or '', r.mail or '', r.destino or '',
            ])
        return exportar(formato, 'reporte_movimientos', 'Reporte de movimientos', describir_filtros(params),
                        encabezados, filas)