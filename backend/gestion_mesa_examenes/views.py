from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import MesasExamenesSerializer
from .models import MesasExamenes
from rest_framework.response import Response

class MesasExamenesView(APIView):
    def get(self, request):
        mesas_examenes = MesasExamenes.objects.all()
        serializer = MesasExamenesSerializer(mesas_examenes, many=True)
        return Response(serializer.data)
    def post(self, request):
        Serializer = MesasExamenesSerializer(data=request.data)
        if Serializer.is_valid():
            Serializer.save()
            return Response(Serializer.data, status=201)   
        return Response(Serializer.errors, status=400)
    def delete(self, request, pk):
        try:
            mesa_examen = MesasExamenes.objects.get(pk=pk)
            mesa_examen.delete()
            return Response(status=204)
        except MesasExamenes.DoesNotExist:
            return Response(status=404)