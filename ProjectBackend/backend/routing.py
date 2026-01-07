# backend/routing.py

from django.urls import re_path
from .consumers import ClipboardConsumer

print("🚀 backend.routing loaded")
websocket_urlpatterns = [
    re_path(
        r"ws/clipboard/(?P<clipboard_id>[-0-9a-fA-F]+)/$",
        ClipboardConsumer.as_asgi()
    ),
]
