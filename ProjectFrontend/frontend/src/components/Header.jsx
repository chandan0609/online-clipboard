import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Header({ mode, setMode, onMenuClick }) {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Online Clipboard
        </Typography>

        <IconButton
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          color="inherit"
          sx={{
            transition: "0.3s",
            transform: mode === "dark" ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
