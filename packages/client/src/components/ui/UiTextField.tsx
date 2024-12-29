import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const UiTextField: FC<TextFieldProps> = ({ ...props }) => (
  <TextField
    variant="outlined"
    fullWidth
    InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
    {...props}
  />
);
