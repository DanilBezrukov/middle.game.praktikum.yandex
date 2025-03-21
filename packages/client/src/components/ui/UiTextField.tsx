import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const UiTextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const paperTextColor = theme === "light" ? "black" : "#FFE993";
  const tableLinkColor = theme === "light" ? "#1976d2" : "#FFCC56";

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
