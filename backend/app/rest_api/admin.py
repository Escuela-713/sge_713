from django.contrib import admin
from rest_api.models import *

# Register your models here.
@admin.register(Carrera)
class CarreraAdmin(admin.ModelAdmin):
    list_display = ["id_carrera","nombre","titulo_egreso","id_estado"]