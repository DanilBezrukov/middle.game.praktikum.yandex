import { UiLayout } from "@/components/ui/UiLayout";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import backgroundGame from "@/assets/background-game.png";
import { GameScreen } from "@/components/GameScreen/GameScreen";
import { useRef } from "react";
import { Fullscreen, Mouse } from "@mui/icons-material";
import { useFullscreen } from "@/hooks";

export function GamePage() {
  const ref = useRef<HTMLElement>(null);
  const { toggleFullScreen, isOpenFullScreen } = useFullscreen({ refElement: ref });

  return (
    <UiLayout
      sx={{
        flexDirection: "column",
        padding: "80px 50px",
        height: "100vh",
      }}>
      <Box
        ref={ref}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "30px",
          alignItems: "center",
          backgroundImage: `url(${backgroundGame})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundAttachment: "fixed",
          minHeight: "800px",
          maxHeight: "800px",
          width: "1200px",
          outline: "6px solid #fff",
        }}>
        <GameScreen />
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
      </Box>
    </UiLayout>
  );
}
