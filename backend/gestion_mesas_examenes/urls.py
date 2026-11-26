from django.urls import path
from gestion_mesas_examenes.views import InscripcionView, InscripcionPreceptorView, MesasExamenesView

urlpatterns = [
    path('mesas_examenes/', MesasExamenesView.as_view()),
    path('mesas_examenes/<int:id_mesa_examen>/', MesasExamenesView.as_view()),
    path('mesas_examenes/inscripcion/alumno/', InscripcionView.as_view()),
    path('mesas_examenes/inscripcion/preceptor/', InscripcionPreceptorView.as_view())
]
