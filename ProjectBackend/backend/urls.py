from django.urls import path
from .views import ClipboardAPIView

urlpatterns = [
    path("clipboard/", ClipboardAPIView.as_view()),
]
