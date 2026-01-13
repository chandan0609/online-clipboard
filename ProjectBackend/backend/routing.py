# routing.py
from django.urls import re_path
from .consumers import ClipboardConsumer

websocket_urlpatterns = [
    re_path(
        r"ws/clipboard/(?P<short_code>[A-Za-z0-9]+)/$",
        ClipboardConsumer.as_asgi()
    ),
]
