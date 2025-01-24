import { IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UiButton } from "@/components/ui/UiButton";
import { paths } from "@/app/constants/paths";
import { TBirds } from "@/components/Game/type";
import { birdSkins } from "@/components/Game/birdSkins";

export function GameSettingsScreen({ onChooseBird }: { onChooseBird: (variant: TBirds) => void }) {
  return (
    <>
      <Typography variant={"h2"}>Выберите птицу</Typography>
      <Stack direction={"row"} gap={"80px"}>
        {Object.entries(birdSkins).map(([key, value]) => (
          <IconButton
            key={key}
            sx={{
              border: 2,
              borderColor: "black",
              borderRadius: 0,
            }}
            onClick={() => onChooseBird(key as TBirds)}>
            <img width={100} height={100} src={value.up} alt={"bird"} />
          </IconButton>
        ))}
      </Stack>
      <Link to={paths.homePage} style={{ color: "inherit" }}>
        <UiButton
          sx={{
            width: 300,
            backgroundColor: "#6AD08F",
          }}>
          Главная страница
        </UiButton>
      </Link>
    </>
  );
}
