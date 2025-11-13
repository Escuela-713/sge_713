from django.urls import path
from .views import MesasExamenesView

urlpatterns = [
    path('mesas_examenes/', MesasExamenesView.as_view(), name='mesas_examenes'),
]
