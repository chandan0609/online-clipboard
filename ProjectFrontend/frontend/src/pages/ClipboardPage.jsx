import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { fetchClipboard } from "../services/clipboardApi";
import { useTheme } from "@mui/material/styles";

const ClipboardPage = () => {
  const { id: shortCode } = useParams(); // ✅ single source of truth
  const [text, setText] = useState("");
  const socketRef = useRef(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  /* =====================
     FETCH INITIAL CONTENT
     ===================== */
  useEffect(() => {
    if (!shortCode) return;

    fetchClipboard(shortCode)
      .then((data) => setText(data.content || ""))
      .catch(console.error);
  }, [shortCode]);

  /* =====================
     WEBSOCKET CONNECTION
     ===================== */
  useEffect(() => {
    if (!shortCode) return;

    const socket = new WebSocket(
      `ws://localhost:8000/ws/clipboard/${shortCode}/`
    );

    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.content !== undefined) {
        setText(data.content);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => socket.close();
  }, [shortCode]); // ✅ FIXED

  /* =====================
     HANDLE TYPING
     ===================== */
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
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 1.5, color: isDark ? "#fff" : "#111" }}
      >
        Shared Clipboard
      </Typography>

      {/* GLASS CONTAINER */}
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: "16px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          background: isDark
            ? "rgba(15, 23, 42, 0.6)"
            : "rgba(255, 255, 255, 0.6)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid rgba(0,0,0,0.08)",
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
