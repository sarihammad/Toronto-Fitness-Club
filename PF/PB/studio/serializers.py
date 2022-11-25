from rest_framework import serializers
from studio.models import Location, Studio


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ("address", "post_code", "latitude", "longitude", "directions")


class StudioSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Studio
        fields = ("name", "phone_num", "location")
