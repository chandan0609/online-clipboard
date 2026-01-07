from django.urls import path
from .views import ClipboardAPIView

urlpatterns = [
    path("clipboard/<uuid:clipboard_id>/", ClipboardAPIView.as_view())

]
