import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Box, Button, Typography, Paper } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const HomePage = () => {
  const navigate = useNavigate();

  const createClipboard = () => {
    const id = uuid();
    navigate(`/clipboard/${id}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          textAlign: "center",
          maxWidth: 420,
          width: "100%",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <ContentPasteIcon sx={{ fontSize: 60, mb: 2 }} color="primary" />

        <Typography variant="h4" gutterBottom>
          Online Clipboard
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Create a clipboard and sync text instantly across devices.
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={createClipboard}
          sx={{
            py: 1.5,
            fontWeight: 600,
          }}
        >
          Create New Clipboard
        </Button>
      </Paper>
    </Box>
  );
};

export default HomePage;
