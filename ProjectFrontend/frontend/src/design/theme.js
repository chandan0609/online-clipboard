import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#90caf9" : "#1976d2",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f5f5f5",
        paper: mode === "dark" ? "#020617" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "Inter, Roboto, sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  });
