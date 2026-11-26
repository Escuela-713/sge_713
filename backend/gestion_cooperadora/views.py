from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Movimiento
from .serializers import MovimientoSerializer


class MovimientoListCreateView(APIView):
    def get(self, request):
        tipo = request.query_params.get('tipo', '')
        fecha_parametro = request.query_params.get('fecha', '')

        if tipo and tipo not in (Movimiento.INGRESO, Movimiento.EGRESO):
            return Response(
                {'tipo': 'Debe ser Ingreso o Egreso.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        fecha = parse_date(fecha_parametro) if fecha_parametro else None
        if fecha_parametro and fecha is None:
            return Response(
                {'fecha': 'Use una fecha válida con formato AAAA-MM-DD.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        movimientos = Movimiento.objects.all()
        if tipo:
            movimientos = movimientos.filter(tipo=tipo)
        if fecha:
            movimientos = movimientos.filter(fecha=fecha)
        movimientos = movimientos.order_by('-id')[:10]
        serializer = MovimientoSerializer(movimientos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MovimientoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovimientoDetailView(APIView):
    def get(self, request, pk):
        movimiento = get_object_or_404(Movimiento, pk=pk)
        serializer = MovimientoSerializer(movimiento)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        movimiento = get_object_or_404(Movimiento, pk=pk)
        serializer = MovimientoSerializer(movimiento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        movimiento = get_object_or_404(Movimiento, pk=pk)
        movimiento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
