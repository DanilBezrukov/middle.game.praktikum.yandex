import { Box } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function GameOverScreen() {
  return (
    <>
      <Box
        component="h2"
        sx={{
          fontFamily: "Jolly Lodger, sans-serif",
          fontSize: "180px",
          lineHeight: "normal",
          color: "rgb(78, 121, 58)",
          m: "0px",
        }}>
        Flappy Bird
      </Box>

      <Box
        sx={{
          fontSize: "60px",
          fontWeight: "700",
          textAlign: "center",
          lineHeight: "normal",
        }}>
        Очки <br /> 56
      </Box>

      <Button
        component={Link}
        to="/"
        sx={{
          backgroundColor: "#6AD08F",
          color: "inherit",
          fontSize: "18px",
          fontWeight: "700",
        }}
        variant="contained"
        type="button">
        Главная страница
      </Button>

      <Button
        sx={{
          borderRadius: "50%",
          color: "rgb(78, 121, 58)",
          backgroundColor: "rgb(254, 252, 214)",
          height: "100px",
          width: "100px",
          border: "2px solid currentColor",
        }}
        type="button"
        variant="contained">
        <RefreshIcon fontSize="large" color="inherit" />
      </Button>
    </>
  );
}
