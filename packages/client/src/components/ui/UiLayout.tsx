import { FC, ReactNode } from "react";
import { Box, SxProps } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ThemeToggleButton } from "@/components/ui/UiThemeToggleButton";
import backgroundImage from "@/assets/background.png";
import backgroundNightImage from "@/assets/background-night.png";

export const UiLayout: FC<{ children: ReactNode; sx?: SxProps }> = ({ children, sx }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url(${theme === "light" ? backgroundImage : backgroundNightImage})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        ...sx,
      }}>
      {children}
      <ThemeToggleButton />
    </Box>
  );
};
