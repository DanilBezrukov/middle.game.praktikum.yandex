import { GameTitle } from "@/components/GameTitle";
import { Fab, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function GameStartedScreen({ setGameScreen }: { setGameScreen: () => void }) {
  const [PlayArrowIcon, setPlayArrowIcon] = useState(<></>);

  const setIcon = async () => {
    const { PlayArrow } = await import("@mui/icons-material");
    setPlayArrowIcon(
      <PlayArrow
        sx={{
          height: "70px",
          width: "70px",
        }}
        color="inherit"
      />,
    );
  };

  useEffect(() => {
    setIcon().then();
  }, []);
  return (
    <>
      <GameTitle />

      <Fab
        onClick={setGameScreen}
        sx={{
          color: "rgb(78, 121, 58)",
          backgroundColor: "rgb(254, 252, 214)",
          height: "180px",
          width: "180px",
          border: "2px solid currentColor",
        }}>
        {PlayArrowIcon}
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
