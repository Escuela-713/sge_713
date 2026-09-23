from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView as ApiView
from gestion_carrera_planes_materias.models import Materia
from gestion_mesas_examenes.models import MesaExamen
from gestion_mesas_examenes.serializer import MesaExamenSerializer

# Create your views here.
class MesasExamenesView(ApiView):
    # Obtener las mesas según el filtro especificado, en caso de no tener, se deberían recuperar todas las mesas
    def get(self, req: Request):
        filters = req.query_params.dict()
        mesas = MesaExamen.objects.complex_filter(filters) if filters else MesaExamen.objects.all()
        mesas_serializadas = MesaExamenSerializer(mesas, many=True).data
    
        if (len(mesas_serializadas) == 0):
            return Response({'error': 'No hay mesas para mostrar.'}, status=HTTP_404_NOT_FOUND)

        return Response(mesas_serializadas)

    # Crear nueva mesa
    def post(self, req: Request):
        body = req.data

        if (not body):
            return Response({'error': 'Complete los datos para subir una nueva mesa.'}, status=HTTP_400_BAD_REQUEST)

        if (isinstance(body, list)):
            return Response({'error': 'El cuerpo de la petición debe ser un objeto.'}, status=HTTP_400_BAD_REQUEST)

        nueva_mesa = MesaExamenSerializer(data=body)

        if (not nueva_mesa.is_valid()):
            return Response({'error': nueva_mesa.errors}, status=HTTP_400_BAD_REQUEST)

        mesa_guardada = nueva_mesa.save()

        return Response({'message': f'Nueva mesa creada, ID: {mesa_guardada.id_mesa_examen}'}, status=HTTP_201_CREATED)
