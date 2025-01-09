import { FC, ReactNode } from "react";
import backgroundImage from "@/assets/background.png";
import { Box, SxProps } from "@mui/material";

export const UiLayout: FC<{ children: ReactNode; sx?: SxProps }> = ({ children, sx }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "center",
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      ...sx,
    }}>
    {children}
  </Box>
);
