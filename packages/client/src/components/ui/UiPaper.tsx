import { FC, ReactNode, ElementType, HTMLAttributes } from "react";
import { Paper, SxProps } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type UiPaperProps = {
  children: ReactNode;
  sx?: SxProps;
  component?: ElementType;
} & HTMLAttributes<HTMLFormElement>;

export const UiPaper: FC<UiPaperProps> = ({ children, sx, component = "div", ...props }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const paperBackground = theme === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(31, 28, 63, 0.8)";
  const paperTextColor = theme === "light" ? "black" : "#FFE993";

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
