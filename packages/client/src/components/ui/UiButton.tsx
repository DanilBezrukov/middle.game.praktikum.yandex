import { FC } from "react";
import { Button, ButtonProps } from "@mui/material";

export const UiButton: FC<ButtonProps> = ({ children, sx, ...otherProps }) => (
  <Button
    variant="contained"
    type="submit"
    fullWidth
    sx={{
      height: "inherit",
      backgroundColor: "#FFE600",
      color: "#000",
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
