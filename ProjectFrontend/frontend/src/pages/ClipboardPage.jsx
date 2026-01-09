import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { fetchClipboard } from "../services/clipboardApi";
import { useTheme } from "@mui/material/styles";




const ClipboardPage = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const socketRef = useRef(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    fetchClipboard(id)
      .then((data) => setText(data.content || ""))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/clipboard/${id}/`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setText(data.content);
    };

    return () => socket.close();
  }, [id]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socketRef.current?.send(JSON.stringify({ content: newText }));
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "calc(100vh - 112px)",
        display: "flex",
        flexDirection: "column",
        px: { xs: 1, md: 3 },
        py: 2,
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 1.5, color: "white" }}
      >
        {/* TypeOUT your Clipboard */}
      </Typography>

      {/* GLASS CONTAINER */}
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
      >
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Start typing…"
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            border: "none",
            outline: "none",
            padding: "20px",
            fontSize: "16px",
            lineHeight: "1.7",
            fontFamily: "Inter, monospace",
            background: "transparent",
            color: isDark ? "#c7d2fe" : "#4f46e5",
            caretColor: isDark ? "#c7d2fe" : "#4f46e5",
            textShadow: isDark ? "0 0 1px rgba(199,210,254,0.3)" : "none",
            overflowY: "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default ClipboardPage;
