from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_api.carreras_planes_materias.serializers import *

class CarreraApiViewSet(APIView):

    def get(self, request):
       try:
           paises=CarreraSerializer(Carrera.objects.all(), many=True).data
           return Response(paises)
       except Exception as ex:
           print(ex)
           return Response({'details':'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        try:
            data=request.data
            serializer = CarreraSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Carrera registrada exitosamente'}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex :
            print(ex)
            return Response({'details':'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
