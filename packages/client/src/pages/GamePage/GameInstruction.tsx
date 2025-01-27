import { Stack, Typography } from "@mui/material";
import { Fullscreen, FullscreenExit, Mouse, Pause, VolumeUp } from "@mui/icons-material";

export const GameInstruction = ({ isOpenFullScreen }: { isOpenFullScreen: boolean }) => (
  <Stack
    py={1}
    px={3}
    width={"100%"}
    height={75}
    direction={"row"}
    alignItems={"start"}
    justifyContent={"end"}
    position={"absolute"}
    bottom={0}
    left={0}
    gap={"10px"}
    bgcolor={"rgba(255,255,255,0.5)"}>
    <Stack gap={"10px"}>
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
        <VolumeUp fontSize={"small"} sx={{ mx: 1 }} />
        <Typography
          sx={{
            userSelect: "none",
          }}>
          - Включить/выключить музыку (m)
        </Typography>
      </Stack>
    </Stack>
    <Stack gap={"10px"}>
      <Stack direction={"row"} alignItems={"center"}>
        <Pause sx={{ mx: 1 }} />
        <Typography
          sx={{
            userSelect: "none",
          }}>
          - Пауза (p)
        </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        {isOpenFullScreen ? (
          <FullscreenExit sx={{ mx: 1 }} />
        ) : (
          <Fullscreen fontSize={"medium"} sx={{ mx: 1 }} />
        )}

        <Typography
          sx={{
            userSelect: "none",
          }}>
          {isOpenFullScreen
            ? "- Свернуть полноэкранный режим или клавиша (f)"
            : "- Полноэкранный режим или клавиша (f)"}
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);
