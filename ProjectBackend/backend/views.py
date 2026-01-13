# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.shortcuts import get_object_or_404
from .models import Clipboard


class CreateClipboardAPIView(APIView):
    """
    POST /api/create/
    Creates a new clipboard and returns short_code
    """
    def post(self, request):
        clipboard = Clipboard.objects.create(content="")
        return Response({
            "short_code": clipboard.short_code
        })


class ClipboardAPIView(APIView):
    """
    GET  /c/<short_code>/
    POST /c/<short_code>/
    """

    def get(self, request, short_code):
        clipboard = get_object_or_404(Clipboard, short_code=short_code)
        return Response({
            "content": clipboard.content
        })

    def post(self, request, short_code):
        clipboard = get_object_or_404(Clipboard, short_code=short_code)
        clipboard.content = request.data.get("content", "")
        clipboard.save(update_fields=["content"])

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"clipboard_{short_code}",
            {
                "type": "clipboard_update",
                "content": clipboard.content
            }
        )

        return Response({"status": "synced"})
print("🚀 backend.views loaded")