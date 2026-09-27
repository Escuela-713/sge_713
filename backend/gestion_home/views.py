from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from gestion_home.models import Carrousel, Categories, Publication
from gestion_home.serializers import CarrouselSerializer, CategoriesSerializer, PublicationSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class PublicationView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        publications = Publication.objects.all()
        serializer = PublicationSerializer(publications, many=True, context={'request': request})
        return Response(serializer.data, status=200)

    def post(self, request):
        serializer = PublicationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# NUEVO: hace falta esta vista para poder ver, editar y borrar UNA publicación puntual.
# Tu servicio Angular (getCardById, updateCard, deleteCardById) ya apunta a
# ${this.apiUrl}${id}/, así que sin esta vista esos métodos van a fallar con 404.
class PublicationDetailView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, pk):
        publication = get_object_or_404(Publication, pk=pk)
        serializer = PublicationSerializer(publication, context={'request': request})
        return Response(serializer.data, status=200)

    def patch(self, request, pk):
        publication = get_object_or_404(Publication, pk=pk)
        serializer = PublicationSerializer(
            publication, data=request.data, partial=True, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        publication = get_object_or_404(Publication, pk=pk)
        publication.delete()
        return Response(status=204)


class CategoriesView(APIView):
    parser_classes = [MultiPartParser, FormParser]

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


class CarrouselView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        carrousel = Carrousel.objects.all()
        serializer = CarrouselSerializer(carrousel, many=True, context={'request': request})
        return Response(serializer.data, status=200)