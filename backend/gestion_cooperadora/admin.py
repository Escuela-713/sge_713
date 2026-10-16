from django.contrib import admin
from .models import Movimiento


@admin.register(Movimiento)
class MovimientoAdmin(admin.ModelAdmin):
	list_display = ('fecha', 'tipo', 'monto', 'origen', 'destino')
	list_filter = ('tipo', 'fecha')
	search_fields = ('origen', 'destino', 'descripcion')
