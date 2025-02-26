import { Box, Fab } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { GameTitle } from "@/components/GameTitle";
import { Refresh } from "@mui/icons-material";

export function GameOverScreen({
  setGameScreen,
  score,
}: {
  setGameScreen: () => void;
  score: number;
}) {
  return (
    <>
      <GameTitle />
      <Box
        sx={{
          fontSize: "60px",
          fontWeight: "700",
          textAlign: "center",
          lineHeight: "normal",
        }}>
        Очки <br /> {score}
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

      <Fab
        onClick={setGameScreen}
        sx={{
          color: "rgb(78, 121, 58)",
          backgroundColor: "rgb(254, 252, 214)",
          height: "100px",
          width: "100px",
          border: "2px solid currentColor",
        }}>
        <Refresh fontSize="large" color="inherit" />
      </Fab>
    </>
  );
}
