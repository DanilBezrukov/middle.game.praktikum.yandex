import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const GameInstruction = ({ isOpenFullScreen }: { isOpenFullScreen: boolean }) => {
  const [FullscreenExit, setFullscreenExit] = useState(<></>);
  const [Fullscreen, setFullscreen] = useState(<></>);
  const [Mouse, setMouse] = useState(<></>);
  const [Pause, setPause] = useState(<></>);
  const [VolumeUp, setVolumeUp] = useState(<></>);
  const setIcons = async () => {
    const { FullscreenExit, Fullscreen, Mouse, Pause, VolumeUp } = await import(
      "@mui/icons-material"
    );

    setFullscreen(<Fullscreen fontSize={"medium"} sx={{ mx: 1 }} />);
    setFullscreenExit(<FullscreenExit sx={{ mx: 1 }} />);
    setMouse(<Mouse fontSize={"small"} sx={{ mx: 1 }} />);
    setPause(<Pause sx={{ mx: 1 }} />);
    setVolumeUp(<VolumeUp fontSize={"small"} sx={{ mx: 1 }} />);
  };

  useEffect(() => {
    setIcons();
  }, []);

  return (
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
          {Mouse}
          <Typography
            sx={{
              userSelect: "none",
            }}>
            - Левая клавиша мыши для полета
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          {VolumeUp}
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
          {Pause}
          <Typography
            sx={{
              userSelect: "none",
            }}>
            - Пауза (p)
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          {isOpenFullScreen ? <>{FullscreenExit}</> : <>{Fullscreen}</>}

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
};
