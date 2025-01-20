import { IconButton, Stack, Typography } from "@mui/material";
import { Fullscreen, Mouse } from "@mui/icons-material";

export const GameInstruction = ({
  toggleFullScreen,
  isOpenFullScreen,
}: {
  toggleFullScreen: () => void;
  isOpenFullScreen: boolean;
}) => (
  <Stack
    py={1}
    px={3}
    width={"100%"}
    height={75}
    alignItems={"end"}
    position={"absolute"}
    bottom={0}
    left={0}
    bgcolor={"rgba(255,255,255,0.5)"}>
    <Stack direction={"row"} alignItems={"center"}>
      <Mouse fontSize={"small"} sx={{ mx: 1 }} />
      <Typography
        sx={{
          userSelect: "none",
        }}>
        - Левая клавиша мыши для полета
      </Typography>
    </Stack>
    <Stack direction={"row"} alignItems={"center"}>
      <IconButton onClick={toggleFullScreen}>
        <Fullscreen fontSize={"medium"} />
      </IconButton>
      <Typography
        sx={{
          userSelect: "none",
        }}>
        {isOpenFullScreen
          ? "Свернуть полноэкранный режим или клавиша (f)"
          : "Полноэкранный режим или клавиша (f)"}
      </Typography>
    </Stack>
  </Stack>
);
