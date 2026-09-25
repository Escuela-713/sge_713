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

class PublicationDetailView(APIView):
    def get(self, request, pk):
        try:
            publication = Publication.objects.get(pk=pk)
        except Publication.DoesNotExist:
            return Response({'error': 'Publicación no encontrada'}, status=404)

        serializer = PublicationSerializer(publication)
        return Response(serializer.data, status=200)

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