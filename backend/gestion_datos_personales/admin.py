from django.contrib import admin
from .models import Persona, Alumno, Rol, Tutor

admin.site.register(Persona)
admin.site.register(Alumno)
admin.site.register(Tutor)
admin.site.register(Rol)
