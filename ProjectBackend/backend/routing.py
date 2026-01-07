from django.urls import re_path
from .consumers import ClipboardConsumer

websocket_urlpatterns = [
    re_path(r"ws/clipboard/(?P<user_id>\d+)/$", ClipboardConsumer.as_asgi()),
]
