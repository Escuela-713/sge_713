from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView as ApiView
from gestion_datos_personales.models import Alumno
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

            return Response({'data': f'Nueva mesa creada, ID: {mesa_guardada.id_mesa_examen}.'}, status=HTTP_201_CREATED)
        
        except Exception as exception:
            print(exception)
            return Response({'message': 'Hubo un error inesperado en el servidor, estamos trabajando para solucionarlo.'}, status=HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, req: Request, id_mesa_examen=None):
        body = req.data

        if (not body):
            return Response({'message': 'Ingrese los nuevos datos para la mesa.'}, status=HTTP_400_BAD_REQUEST)

        if (not id_mesa_examen or id_mesa_examen is None):
            return Response({'message': 'Pase el ID de la mesa que quiere editar.'}, status=HTTP_400_BAD_REQUEST)

        mesa = MesaExamen.objects.filter(id_mesa_examen=id_mesa_examen)

        if (len(mesa) == 0):
            return Response({'message': f'No existe una mesa con ID {id_mesa_examen}'}, status=HTTP_404_NOT_FOUND)

        body = dict(body)

        mesa_actualizada = MesaExamenSerializer(mesa[0], data=body, partial=True)

        if (not mesa_actualizada.is_valid()):
            return Response({'message': mesa_actualizada.errors}, status=HTTP_400_BAD_REQUEST)

        mesa_actualizada.save()

        return Response({'data': 'La mesa se actualizó con éxito.'}, status=HTTP_200_OK)


class InscripcionAlumnoView(ApiView):
    def post(self, req: Request):
        body = req.data

        if (not body):
            return Response({'message': 'Ingrese los datos de para la inscripcion (ID del alumno y la mesa).'}, status=HTTP_400_BAD_REQUEST)

        inscripcion = AlumnosAnotadosAMesasSerializer(data=body)

        if (not inscripcion.is_valid()):
          return Response({'message': inscripcion.errors}, status=HTTP_400_BAD_REQUEST)

        inscripcion.save()

        return Response({"data": "Inscripción creada."}, status=HTTP_201_CREATED)

class InscripcionPreceptorView(ApiView):
    # A primera vista pareciera funcionar, pero hay que probarlo con datos "reales", con alguna persona existente, el tema es que haya una persona existente para probar esto, por la complejidad de la tabla de personas.
    def post(self, req: Request):
        body = req.data

        if (not body):
            return Response({'message': 'Ingrese los datos de para la inscripcion (DNI e ID de la mesa).'}, status=HTTP_400_BAD_REQUEST)

        if (not isinstance(body, dict)):
            return Response({'message': 'El cuerpo de la petición debe ser un diccionario.'}, status=HTTP_400_BAD_REQUEST)

        id_mesa_examen = body['id_mesa_examen']
        dni = body['dni']

        if (not id_mesa_examen):
            return Response({'message': 'Seleccione la mesa en la que quiere inscribir a un alumno.'})


        mesa_encontrada = MesaExamen.objects.filter(id_mesa_examen=id_mesa_examen)

        if (len(mesa_encontrada) == 0):
            return Response({'message': f'No se encontró la mesa de examen con ID {id_mesa_examen}.'}, status=HTTP_404_NOT_FOUND)

        if (len(mesa_encontrada) > 1):
            return Response({'message': f'Existe más de una mesa de examen con ID {id_mesa_examen}.'}, status=HTTP_400_BAD_REQUEST)

        if (not dni):
            return Response({'message': 'Pase el DNI del alumno que quiere inscribir.'})

        alumno_encontrado = Alumno.objects.filter(dni=dni)

        if (len(alumno_encontrado) == 0):
            return Response({'message': f'No se encontró alumno con DNI {dni}'}, status=HTTP_404_NOT_FOUND)

        if (len(alumno_encontrado) > 1):
            return Response({'message': f'Existe más de un alumno con DNI {dni}'}, status=HTTP_400_BAD_REQUEST)

        inscripcion = {
            'id_mesa_examen': id_mesa_examen,
            'id_alumno': alumno_encontrado[0].id_alumno
        }

        AlumnosAnotadosAMesasSerializer(data=inscripcion).save()

        return Response({'data': f'Se inscribió al alumno de DNI {dni}'}, status=HTTP_200_OK)

