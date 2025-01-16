import { Typography } from "@mui/material";

export function GameTitle() {
  return (
    <Typography
      component="h2"
      sx={{
        fontFamily: "Jolly Lodger, sans-serif",
        fontSize: "180px",
        lineHeight: "normal",
        color: "rgb(78, 121, 58)",
        m: "0px",
      }}>
      Flappy Bird
    </Typography>
  );
}
