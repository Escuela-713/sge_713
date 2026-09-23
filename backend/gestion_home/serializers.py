from rest_framework import serializers

from .models import Publication, Carrousel, HomePageSection


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

class CarrouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrousel
        fields = "__all__"

class HomePageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePageSection
        fields = "__all__"
