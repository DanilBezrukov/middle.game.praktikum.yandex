import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const UiTextField = forwardRef<HTMLDivElement, TextFieldProps>(({ ...props }, ref) => (
  <TextField
    ref={ref}
    variant="outlined"
    fullWidth
    InputProps={{ sx: { borderRadius: 10 } }}
    {...props}
  />
));

UiTextField.displayName = "UiTextField";
