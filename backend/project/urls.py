"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('gestion_carrera_planes_materias.urls')),
    path('api/v1/', include('gestion_datos_personales.urls')),
    path('api/v1/auth/', include('gestion_usuarios.urls')),
    path('api/v1/', include('gestion_incidencias.urls')),
    path('api/v1/', include('gestion_inventario.urls')),
    path('api/v1/', include('gestion_home.urls')),
    path('api/v1/', include('gestion_mesas_examenes.urls')),
    path('api/v1/', include('gestion_donar_713.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
