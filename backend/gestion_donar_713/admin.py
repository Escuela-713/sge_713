from django.contrib import admin

from .models import CarruselSlide, Evento, Informacion, Noticia, TipoInformacion

admin.site.register(CarruselSlide)
admin.site.register(Evento)
admin.site.register(Noticia)
admin.site.register(Informacion)
admin.site.register(TipoInformacion)
