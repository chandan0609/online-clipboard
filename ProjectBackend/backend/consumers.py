from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ClipboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.clipboard_id = self.scope["url_route"]["kwargs"]["clipboard_id"]
        self.group_name = f"clipboard_{self.clipboard_id}"
        print("WS Connected:", self.group_name)
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        content = data["content"]

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "clipboard_update",
                "content": content
            }
        )

    async def clipboard_update(self, event):
        await self.send(text_data=json.dumps({
            "content": event["content"]
        }))
