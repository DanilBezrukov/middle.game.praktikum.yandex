import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const UiTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ ...props }, ref) => (
    <TextField
      ref={ref}
      variant="outlined"
      fullWidth
      InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
      {...props}
    />
  )
);

UiTextField.displayName = "UiTextField";
