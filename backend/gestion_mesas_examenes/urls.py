from django.urls import path
from gestion_mesas_examenes.views import MesasExamenesView

urlpatterns = [
	path('mesas_examenes/', MesasExamenesView.as_view()),
  path('mesas_examenes/inscripcion/', MesasExamenesView.inscripcion)
]
