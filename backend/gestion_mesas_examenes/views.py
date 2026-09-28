from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView as ApiView
from gestion_mesas_examenes.models import MesaExamen
from gestion_mesas_examenes.serializer import AlumnosAnotadosAMesasSerializer, MesaExamenSerializer

# Create your views here.
class MesasExamenesView(ApiView):
    # Obtener las mesas según el filtro especificado, en caso de no tener, se recuperan todas las mesas
    def get(self, req: Request):
        filtros = req.query_params.dict()
        mesas_con_fks_cambiadas = MesaExamen.objects.select_related('id_materia', 'id_carrera')

        if (filtros):
            mesas = mesas_con_fks_cambiadas.complex_filter(filtros)
        else:
            mesas = mesas_con_fks_cambiadas.all()

        mesas_serializadas = MesaExamenSerializer(mesas, many=True).data

        if (len(mesas_serializadas) == 0):
            return Response({'message': 'No hay mesas para mostrar.'}, status=HTTP_404_NOT_FOUND)

        return Response({'data': mesas_serializadas})

    # Crear nueva mesa
    def post(self, req: Request):
        try:
            body = req.data

            if (not body):
                return Response({'message': 'Complete los datos para subir una nueva mesa.'}, status=HTTP_400_BAD_REQUEST)

            if (isinstance(body, list)):
                return Response({'message': 'El cuerpo de la petición debe ser un objeto.'}, status=HTTP_400_BAD_REQUEST)

            nueva_mesa = MesaExamenSerializer(data=body)

            if (not nueva_mesa.is_valid()):
                return Response({'message': nueva_mesa.errors}, status=HTTP_400_BAD_REQUEST)

            mesa_guardada = nueva_mesa.save()

            return Response({'message': f'Nueva mesa creada, ID: {mesa_guardada.id_mesa_examen}.'}, status=HTTP_201_CREATED)
        
        except Exception as exception:
            print(exception)
            return Response({'message': 'Hubo un error inesperado en el servidor, estamos trabajando para solucionarlo.'}, status=HTTP_500_INTERNAL_SERVER_ERROR)

class InscripcionView(ApiView):
    def post(self, req: Request):
        body = req.data

        if (not body):
            return Response({'message':'No hay información que pueda usarse.'}, status=HTTP_400_BAD_REQUEST)

        inscripcion = AlumnosAnotadosAMesasSerializer(data=body)

        if (not inscripcion.is_valid()):
          return Response({'message':inscripcion.errors}, status=HTTP_400_BAD_REQUEST)

        inscripcion_guardada = inscripcion.save()

        return Response({"data": "inscripcion creada"}, status=HTTP_201_CREATED)
