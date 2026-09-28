from django.urls import path
from gestion_mesas_examenes.views import InscripcionView, MesasExamenesView

urlpatterns = [
	path('mesas_examenes/', MesasExamenesView.as_view()),
  path('mesas_examenes/inscripcion/', InscripcionView.as_view())
]
