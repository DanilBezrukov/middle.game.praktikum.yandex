import { FC, ReactNode } from "react";
import { Paper, SxProps } from "@mui/material";

export const UiPaper: FC<{ children: ReactNode; sx?: SxProps }> = ({
  children,
  sx,
}) => (
  <Paper
    sx={{
      padding: "70px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      ...sx,
    }}>
    {children}
  </Paper>
);
