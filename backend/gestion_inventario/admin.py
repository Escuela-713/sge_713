from django.contrib import admin

from .models import Bienes, Categoria, DetalleInventario, RegistroInventario, Ubicacion


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id_categoria', 'nombre')
    search_fields = ('nombre',)


@admin.register(Ubicacion)
class UbicacionAdmin(admin.ModelAdmin):
    list_display = ('id_ubicacion', 'nombre')
    search_fields = ('nombre',)


@admin.register(Bienes)
class BienesAdmin(admin.ModelAdmin):
    list_display = ('id_bien', 'nombre', 'categoria', 'ubicacion', 'estado',
                    'cantidad', 'prestado', 'codigo_especial', 'fecha_adquisicion')
    list_filter = ('categoria', 'ubicacion', 'estado')
    search_fields = ('nombre', 'codigo_especial', 'descripcion')


class DetalleInventarioInline(admin.TabularInline):
    model = DetalleInventario
    extra = 0


@admin.register(RegistroInventario)
class RegistroInventarioAdmin(admin.ModelAdmin):
    list_display = ('id_inventario', 'fecha', 'tipo', 'responsable', 'contacto', 'destino')
    list_filter = ('tipo', 'fecha')
    search_fields = ('responsable', 'contacto', 'destino')
    inlines = [DetalleInventarioInline]


@admin.register(DetalleInventario)
class DetalleInventarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_inventario', 'id_bien', 'cantidad')