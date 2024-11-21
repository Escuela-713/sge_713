from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_api.carreras_planes_materias.serializers import *
from rest_api.models import *

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
           planes_de_estudio = Plan.objects.select_related('carrera').all()
           planes_data=[]
           for plan in planes_de_estudio:
               planes_data.append({
                   'id_plan':plan.id_plan,
                   'horas_catedra':plan.horas_catedra,
                   'horas_reloj':plan.horas_reloj,
                   'nombre_carrera':plan.carrera.nombre,
                   'id_carrera':plan.carrera.id_carrera 
               })
           return Response(planes_data)
        except Exception as ex:
           print(ex)
           return Response({'details':'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    