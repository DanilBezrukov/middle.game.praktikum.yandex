import { UiLayout } from "@/components/ui/UiLayout";
import { Box } from "@mui/material";
import backgroundGame from "@/assets/background-game.png";
import { GameScreen } from "@/components/GameScreen/GameScreen";
import { useRef } from "react";
import { useFullscreen } from "@/hooks";
import { GameInstruction } from "@/pages/GamePage/GameInstruction";

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
        <GameScreen
          renderInstruction={() => (
            <GameInstruction
              isOpenFullScreen={isOpenFullScreen}
              toggleFullScreen={toggleFullScreen}
            />
          )}
        />
      </Box>
    </UiLayout>
  );
}
