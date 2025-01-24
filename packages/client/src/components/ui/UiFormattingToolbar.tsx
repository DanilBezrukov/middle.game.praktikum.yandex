import React from "react";
import { IconButton, Box } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

interface UiFormattingToolbarProps {
  formatting: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
  setFormatting: React.Dispatch<
    React.SetStateAction<{
      bold: boolean;
      italic: boolean;
      underline: boolean;
    }>
  >;
}

export const UiFormattingToolbar: React.FC<UiFormattingToolbarProps> = ({
  formatting,
  setFormatting,
}) => (
  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
    <IconButton
      onClick={() => setFormatting(prev => ({ ...prev, bold: !prev.bold }))}
      color={formatting.bold ? "primary" : "default"}>
      <FormatBoldIcon />
    </IconButton>
    <IconButton
      onClick={() => setFormatting(prev => ({ ...prev, italic: !prev.italic }))}
      color={formatting.italic ? "primary" : "default"}>
      <FormatItalicIcon />
    </IconButton>
    <IconButton
      onClick={() => setFormatting(prev => ({ ...prev, underline: !prev.underline }))}
      color={formatting.underline ? "primary" : "default"}>
      <FormatUnderlinedIcon />
    </IconButton>
  </Box>
);
