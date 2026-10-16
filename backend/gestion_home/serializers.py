from rest_framework import serializers

from .models import Publication, Carrousel, Categories

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'

class CarrouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrousel
        fields = '__all__'

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'