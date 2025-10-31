from rest_framework import serializers

from .models import Publication


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
