import { FC, ReactNode } from "react";
import { Box, SxProps } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggleButton } from "@/components/ui/UiThemeToggleButton";

export const UiLayout: FC<{ children: ReactNode; sx?: SxProps }> = ({ children, sx }) => {
  const { layoutBackground } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: layoutBackground,
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
        backgroundSize: "contain",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        ...sx,
      }}>
      {children}
      <ThemeToggleButton />
    </Box>
  );
};
