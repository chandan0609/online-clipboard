import React from "react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchClipboard } from "../services/clipboardApi.js";
const ClipboardPage = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    fetchClipboard(id)
      .then((data) => setText(data.content || ""))
      .catch(console.error);
  }, [id]);

  // WebSocket connection
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/clipboard/${id}/`);

    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setText(data.content);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => socket.close();
  }, [id]);
  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socketRef.current?.send(JSON.stringify({ content: newText }));
  };
  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Shared Clipboard</h2>

      <textarea
        rows="12"
        value={text}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ClipboardPage;
