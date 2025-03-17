import { FC } from "react";
import { IconButton } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/store/slices/theme.slice";

export const ThemeToggleButton: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        "position": "fixed",
        "bottom": 20,
        "right": 20,
        "width": 56,
        "height": 56,
        "borderRadius": "50%",
        "backgroundColor": theme === "light" ? "#fff" : "#333",
        "color": theme === "light" ? "#333" : "#fff",
        "boxShadow": "0px 4px 10px rgba(0, 0, 0, 0.3)",
        "&:hover": {
          backgroundColor: theme === "light" ? "#f0f0f0" : "#444",
        },
      }}>
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </IconButton>
  );
};
