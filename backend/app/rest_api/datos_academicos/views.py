from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_api.datos_academicos.serializers import *
from rest_api.models import *

class InstanciaApiViewSet(APIView):

    def get(self, request):
       try:
           instancia = InstanciaSerializer(Instancia.objects.all(), many=True).data
           return Response(instancia)
       except Exception as ex:
           print(ex)
           return Response({'details':'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    