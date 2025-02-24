import React, { lazy, useEffect, useState } from "react";
import { IconButton, Box } from "@mui/material";

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
}) => {
  const [FormatBoldIcon, setFormatBoldIcon] = useState(<></>);
  const [FormatItalicIcon, setFormatItalicIcon] = useState(<></>);
  const [FormatUnderlinedIcon, setFormatUnderlinedIcon] = useState(<></>);
  const setIcons = async () => {
    const { FormatBold, FormatItalic, FormatUnderlined } = await import("@mui/icons-material");

    setFormatBoldIcon(<FormatBold />);
    setFormatItalicIcon(<FormatItalic />);
    setFormatUnderlinedIcon(<FormatUnderlined />);
  };

  useEffect(() => {
    setIcons().then();
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
      <IconButton
        onClick={() => setFormatting(prev => ({ ...prev, bold: !prev.bold }))}
        color={formatting.bold ? "primary" : "default"}>
        {FormatBoldIcon}
      </IconButton>
      <IconButton
        onClick={() => setFormatting(prev => ({ ...prev, italic: !prev.italic }))}
        color={formatting.italic ? "primary" : "default"}>
        {FormatItalicIcon}
      </IconButton>
      <IconButton
        onClick={() => setFormatting(prev => ({ ...prev, underline: !prev.underline }))}
        color={formatting.underline ? "primary" : "default"}>
        {FormatUnderlinedIcon}
      </IconButton>
    </Box>
  );
};
