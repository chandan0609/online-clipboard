# consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ClipboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.short_code = self.scope["url_route"]["kwargs"]["short_code"]
        self.group_name = f"clipboard_{self.short_code}"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "clipboard_update",
                "content": data.get("content", "")
            }
        )

    async def clipboard_update(self, event):
        await self.send(text_data=json.dumps({
            "content": event["content"]
        }))
