import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export const UiTextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const { tableLinkColor, paperTextColor } = useTheme();
  return (
    <TextField
      ref={ref}
      variant="outlined"
      fullWidth
      InputProps={{ sx: { borderRadius: 10, color: paperTextColor } }}
      {...props}
      InputLabelProps={{
        sx: {
          "color": tableLinkColor,
          "&.Mui-focused": {
            color: tableLinkColor,
          },
        },
      }}
    />
  );
});

UiTextField.displayName = "UiTextField";
