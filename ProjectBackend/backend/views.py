from rest_framework.views import APIView
from rest_framework.response import Response
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Clipboard

class ClipboardAPIView(APIView):

    def get(self, request, clipboard_id):
        clipboard, _ = Clipboard.objects.get_or_create(
            id=clipboard_id,
            defaults={"content": ""}
        )
        return Response({"content": clipboard.content})

    def post(self, request, clipboard_id):
        clipboard, _ = Clipboard.objects.get_or_create(
            id=clipboard_id
        )

        clipboard.content = request.data.get("content", "")
        clipboard.save()

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"clipboard_{clipboard_id}",
            {
                "type": "clipboard_update",
                "content": clipboard.content
            }
        )

        return Response({"status": "synced"})
