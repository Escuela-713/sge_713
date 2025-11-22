from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MesasExamenes
from .serializers import MesasExamenesSerializer


class MesasExamenesView(APIView):

    def get(self, request):
        mesas = MesasExamenes.objects.all()
        serializer = MesasExamenesSerializer(mesas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MesasExamenesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)