import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { SxProps, Theme } from "@mui/material/styles";

interface UiLiProps {
  children: React.ReactNode;
  to: string;
  sx?: SxProps<Theme>;
}

export const UiA: React.FC<UiLiProps> = ({ children, to, sx }) => (
  <Box
    component={Link}
    to={to}
    sx={{
      display: "inline-block",
      textAlign: "center",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
      ...sx,
    }}>
    <Typography
      variant="body1"
      sx={{
        mt: 2,
        color: "#000",
        fontWeight: "bold",
        textDecoration: "underline",
      }}>
      {children}
    </Typography>
  </Box>
);
