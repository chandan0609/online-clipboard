from django.db import models
import uuid

class Clipboard(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
