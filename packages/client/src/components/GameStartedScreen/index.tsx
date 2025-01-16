import { GameTitle } from "@/components/GameTitle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Fab, Typography } from "@mui/material";

export function GameStartedScreen() {
  return (
    <>
      <GameTitle></GameTitle>

      <Fab
        sx={{
          color: "rgb(78, 121, 58)",
          backgroundColor: "rgb(254, 252, 214)",
          height: "180px",
          width: "180px",
          border: "2px solid currentColor",
        }}>
        <PlayArrowIcon
          sx={{
            height: "70px",
            width: "70px",
          }}
          color="inherit"
        />
      </Fab>

      <Typography
        sx={{
          fontFamily: "Jolly Lodger, sans-serif",
          fontSize: "120px",
          lineHeight: "normal",
          color: "rgb(35, 57, 105)",
          m: "0px",
        }}>
        Play
      </Typography>
    </>
  );
}
