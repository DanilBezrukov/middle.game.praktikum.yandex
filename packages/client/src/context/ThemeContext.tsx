import { createContext, useContext, useEffect, useState } from "react";
import backgroundImage from "@/assets/background.png";
import backgroundNightImage from "@/assets/background-night.png";
import backgroundGameImage from "@/assets/background-game.png";
import backgroundGameNightImage from "@/assets/background-game-night.png";
import axios from "axios";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { IProfile } from "@/types/profile.interface";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  layoutBackground: string;
  toggleLayoutBackground: () => void;
  gameBackground: string;
  toggleGameBackground: () => void;
  paperBackground: string;
  togglePaperBackground: () => void;
  paperTextColor: string;
  tableTextColor: string;
  tableBorderColor: string;
  tableLinkColor: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme | null>("light");
  const [layoutBackground, setLayoutBackground] = useState<string>(`url(${backgroundImage})`);
  const [gameBackground, setGameBackground] = useState<string>(`url(${backgroundGameImage})`);
  const [paperBackground, setPaperBackground] = useState<string>("rgba(255, 255, 255, 0.8)");
  const [paperTextColor, setPaperTextColor] = useState<string>("black");
  const [tableTextColor, setTableTextColor] = useState<string>("black");
  const [tableBorderColor, setTableBorderColor] = useState<string>("black");
  const [tableLinkColor, setTableLinkColor] = useState<string>("black");

  const profile = useAppSelector((state: RootState) => state.profile.user as IProfile);
  const userId = profile?.id ? profile?.id : "0000";

  useEffect(() => {
    if (userId) {
      const fetchTheme = async () => {
        try {
          const { data } = await axios.get(`/owner-server/theme/${userId}`);
          if (data.theme) {
            setTheme(data.theme);
          }
        } catch (error) {
          console.error("Ошибка при получении темы", error);
        }
      };
      fetchTheme();
    }
  }, [userId]);

  useEffect(() => {
    if (theme) {
      updateColorsBasedOnTheme(theme);
    }
  }, [theme]);

  const updateColorsBasedOnTheme = (currentTheme: Theme) => {
    setPaperTextColor(currentTheme === "light" ? "black" : "#FFE993");
    setTableTextColor(currentTheme === "light" ? "black" : "#FFE993");
    setTableBorderColor(currentTheme === "light" ? "black" : "#FFE993");
    setTableLinkColor(currentTheme === "light" ? "blue" : "#FE9925");
    setLayoutBackground(
      currentTheme === "light" ? `url(${backgroundImage})` : `url(${backgroundNightImage})`,
    );
    setGameBackground(
      currentTheme === "light" ? `url(${backgroundGameImage})` : `url(${backgroundGameNightImage})`,
    );
    setPaperBackground(
      currentTheme === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(31, 28, 63, 0.8)",
    );
  };

  const toggleTheme = async () => {
    if (!theme) return;
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    updateColorsBasedOnTheme(newTheme);

    try {
      const response = await axios.post(`/owner-server/theme/${userId}`, { theme: newTheme });
      if (response.status === 200) {
        console.log("Тема обновлена на сервере");
      } else {
        console.error("Ошибка при обновлении темы на сервере", response);
      }
    } catch (error) {
      console.error("Ошибка при обновлении темы на сервере", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: theme || "light",
        toggleTheme,
        layoutBackground,
        toggleLayoutBackground: () => updateColorsBasedOnTheme(theme || "light"),
        paperBackground,
        togglePaperBackground: () => updateColorsBasedOnTheme(theme || "light"),
        gameBackground,
        toggleGameBackground: () => updateColorsBasedOnTheme(theme || "light"),
        paperTextColor,
        tableTextColor,
        tableBorderColor,
        tableLinkColor,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme должен быть использован внутри ThemeProvider");
  }
  return context;
};
