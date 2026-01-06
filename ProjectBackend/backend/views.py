from rest_framework.views import APIView
from rest_framework.response import Response
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Clipboard
from .serializers import ClipboardSerializer

class ClipboardAPIView(APIView):

    def get(self, request):
        clips = Clipboard.objects.filter(user=request.user).order_by("-created_at")
        serializer = ClipboardSerializer(clips, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClipboardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        clipboard = serializer.save(user=request.user)

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"clipboard_{request.user.id}",
            {
                "type": "clipboard_update",
                "content": clipboard.content
            }
        )

        return Response({"status": "synced"})
