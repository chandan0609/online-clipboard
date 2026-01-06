from rest_framework import serializers
from .models import Clipboard

class ClipboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clipboard
        fields = ["id", "user", "content", "created_at"]
        read_only_fields = ["user", "created_at"]