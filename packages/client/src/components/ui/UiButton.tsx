import { FC } from "react";
import { Button, ButtonProps } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export const UiButton: FC<ButtonProps> = ({ children, sx, ...otherProps }) => {
  const { theme } = useTheme();

  return (
    <Button
      variant="contained"
      type="submit"
      fullWidth
      sx={{
        height: "inherit",
        backgroundColor: theme === "light" ? "#FFE600" : "#FFCC56",
        color: theme === "light" ? "#000" : "#1F1C3F",
        borderRadius: 3,
        typography: {
          fontSize: "17px",
          fontWeight: "bold",
        },
        ...sx,
      }}
      {...otherProps}>
      {children}
    </Button>
  );
};
