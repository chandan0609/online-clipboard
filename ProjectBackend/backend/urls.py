# urls.py
from django.urls import path
from .views import ClipboardAPIView, CreateClipboardAPIView

urlpatterns = [
    # create clipboard (returns short_code)
    path("api/create/", CreateClipboardAPIView.as_view()),

    # access clipboard via short URL
    path("c/<str:short_code>/", ClipboardAPIView.as_view()),
]
