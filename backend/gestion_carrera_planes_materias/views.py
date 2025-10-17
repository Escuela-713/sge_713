from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from gestion_carrera_planes_materias.models import *
from gestion_carrera_planes_materias.serializers import *

class CarreraApiViewSet(APIView):

    def get(self, request):
       try:
           carreras=CarreraSerializer(Carrera.objects.all(), many=True).data
           return Response(carreras)
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
        
class PlanesApiView(APIView):
    def get(self, request):
       try:
           planes=PlanSerializer(Plan.objects.all(), many=True).data
           return Response(planes)
       except Exception as ex:
           print(ex)
           return Response({'details':'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
class MateriasApiViewSet(APIView):
    def get(self, request):
       try:
           materias=MateriaSerializer(Materia.objects.all(), many=True).data
           return Response(materias)
       except Exception as ex:
           print(ex)
           return Response({'details':'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

