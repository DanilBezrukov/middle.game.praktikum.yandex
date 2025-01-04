import { FC, ReactNode, ElementType, HTMLAttributes } from "react";
import { Paper, SxProps } from "@mui/material";

type UiPaperProps = {
  children: ReactNode;
  sx?: SxProps;
  component?: ElementType;
} & HTMLAttributes<HTMLFormElement>;

export const UiPaper: FC<UiPaperProps> = ({
  children,
  sx,
  component = "div",
  ...props
}) => (
  <Paper
    component={component}
    sx={{
      padding: "70px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      ...sx,
    }}
    {...props}>
    {children}
  </Paper>
);
