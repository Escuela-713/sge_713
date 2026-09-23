from rest_framework.request import Request
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.views import APIView
from rest_framework.response import Response
from gestion_carrera_planes_materias.models import Carrera, Plan, Materia
from gestion_carrera_planes_materias.serializers import CarreraSerializer, PlanSerializer, MateriaSerializer

class CarreraApiViewSet(APIView):

    def get(self, request):
       carreras = CarreraSerializer(Carrera.objects.all(), many=True).data

       return Response(carreras)
    
    def post(self, request):
        try:
            data = request.data

            serializer = CarreraSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Carrera registrada exitosamente'}, status=HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except Exception as ex:
            print(ex)
            return Response({'details':'Internal server error'}, status=HTTP_500_INTERNAL_SERVER_ERROR) 
        
class PlanesApiView(APIView):
    def get(self, request):
           planes = PlanSerializer(Plan.objects.all(), many=True).data
           return Response(planes)
     
class MateriasApiViewSet(APIView):
    def get(self, request):
           materias = MateriaSerializer(Materia.objects.all(), many=True).data
           print(Materia.objects.all())

           if (len(materias) == 0):
                return Response({'error': 'No hay materias para mostrar'}, status=HTTP_404_NOT_FOUND)
            
           return Response(materias)

    def post(self, request: Request):
        body = request.data

        if (not body):
            return Response({'error': 'Complete los datos para subir una nueva materia.'}, status=HTTP_400_BAD_REQUEST)
            
        nueva_materia = MateriaSerializer(data=body)

        if (not nueva_materia.is_valid()):
            return Response({'error': nueva_materia.errors}, status=400)

        materia_guardada = Materia.objects.create(**nueva_materia.data)

        return Response({'message': f'Nueva materia creada, {MateriaSerializer(materia_guardada).data.get('id_materia')}'}, status=HTTP_201_CREATED)
