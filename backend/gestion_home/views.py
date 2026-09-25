from rest_framework.views import APIView
from rest_framework.response import Response
from gestion_home.models import  Carrousel, Categories, Publication
from gestion_home.serializers import CarrouselSerializer, CategoriesSerializer, PublicationSerializer

class PublicationView(APIView):
    def get(self, request):
        publications = Publication.objects.all()
        serializer = PublicationSerializer(publications, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        serializer = PublicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



class CategoriesView(APIView):
    def get(self, request):
        categorias = Categories.objects.all()
        serializer = CategoriesSerializer(categorias, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        serializer = CategoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)