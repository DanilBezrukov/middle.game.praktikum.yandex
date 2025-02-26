import React from "react";
import { Box, IconButton } from "@mui/material";
import { FormatBold, FormatItalic, FormatUnderlined } from "@mui/icons-material";

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
      <FormatBold />
    </IconButton>
    <IconButton
      onClick={() => setFormatting(prev => ({ ...prev, italic: !prev.italic }))}
      color={formatting.italic ? "primary" : "default"}>
      <FormatItalic />
    </IconButton>
    <IconButton
      onClick={() => setFormatting(prev => ({ ...prev, underline: !prev.underline }))}
      color={formatting.underline ? "primary" : "default"}>
      <FormatUnderlined />
    </IconButton>
  </Box>
);
