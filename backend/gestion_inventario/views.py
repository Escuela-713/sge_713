from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Bienes
from .serialzers import BienesSerializer


class BienesViewSet(viewsets.ModelViewSet):
    queryset = Bienes.objects.all()
    serializer_class = BienesSerializer