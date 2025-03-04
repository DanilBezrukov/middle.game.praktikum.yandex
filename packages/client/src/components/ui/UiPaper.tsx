import { FC, ReactNode, ElementType, HTMLAttributes } from "react";
import { Paper, SxProps } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

type UiPaperProps = {
  children: ReactNode;
  sx?: SxProps;
  component?: ElementType;
} & HTMLAttributes<HTMLFormElement>;

export const UiPaper: FC<UiPaperProps> = ({ children, sx, component = "div", ...props }) => {
  const { paperBackground, paperTextColor, theme } = useTheme();

  return (
    <Paper
      component={component}
      sx={{
        padding: "70px",
        color: paperTextColor,
        backgroundColor: paperBackground,
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        boxShadow: theme === "dark" ? "3px 3px 15px rgba(255, 203, 106, 0.2)" : "none",
        ...sx,
      }}
      {...props}>
      {children}
    </Paper>
  );
};
