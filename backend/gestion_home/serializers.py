from rest_framework import serializers

from .models import Publication, CarouselSlide, HomePageSection


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

class CarouselSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselSlide
        fields = "__all__"

class HomePageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePageSection
        fields = "__all__"
