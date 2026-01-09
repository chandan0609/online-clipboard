import { Box, Typography } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 1.5,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {year} • Developed by <strong>Aman 🔥</strong> &{" "}
        <strong>Chandan 💪</strong>
      </Typography>
    </Box>
  );
};

export default Footer;
