import { createContext, useContext, useEffect, useState } from "react";
import backgroundImage from "@/assets/background.png";
import backgroundNightImage from "@/assets/background-night.png";
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
  paperBackground: string;
  togglePaperBackground: () => void;
  paperTextColor: string;
  tableTextColor: string;
  tableBorderColor: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [layoutBackground, setLayoutBackground] = useState(`url(${backgroundImage})`);
  const [paperBackground, setPaperBackground] = useState("rgba(255, 255, 255, 0.8)");
  const [paperTextColor, setPaperTextColor] = useState("black");
  const [tableTextColor, setTableTextColor] = useState("black");
  const [tableBorderColor, setTableBorderColor] = useState("black");

  const profile = useAppSelector((state: RootState) => state.profile.user as IProfile);
  const userId = profile?.id;

  const updateColorsBasedOnTheme = (newTheme: Theme) => {
    if (newTheme === "light") {
      setPaperTextColor("black");
      setTableTextColor("black");
      setTableBorderColor("black");
    } else {
      setPaperTextColor("#FFE993");
      setTableTextColor("#FFE993");
      setTableBorderColor("#FFE993");
    }
  };

  useEffect(() => {
    if (userId !== null && theme === "light") {
      const fetchTheme = async () => {
        try {
          const { data } = await axios.get(`/theme/${userId}`);
          if (data.theme && data.theme !== theme) {
            setTheme(data.theme);
          }
        } catch (error) {
          console.error("Ошибка при получении темы", error);
        }
      };
      fetchTheme();
    }
  }, [userId, theme]);

  useEffect(() => {
    updateColorsBasedOnTheme(theme);
  }, [theme]);

  const toggleTheme = async () => {
    if (userId === null) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      const response = await axios.post(`/theme/${userId}`, { theme: newTheme });
      if (response.status === 200) {
        console.log("Тема обновлена на сервере");
      } else {
        console.error("Ошибка при обновлении темы на сервере", response);
      }
    } catch (error) {
      console.error("Ошибка при обновлении темы на сервере", error);
    }
  };

  const toggleLayoutBackground = () => {
    setLayoutBackground(prev =>
      prev === `url(${backgroundImage})`
        ? `url(${backgroundNightImage})`
        : `url(${backgroundImage})`,
    );
  };

  const togglePaperBackground = () => {
    setPaperBackground(prev =>
      prev === "rgba(255, 255, 255, 0.8)" ? "rgba(31, 28, 63, 0.8)" : "rgba(255, 255, 255, 0.8)",
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        layoutBackground,
        toggleLayoutBackground,
        paperBackground,
        togglePaperBackground,
        paperTextColor,
        tableTextColor,
        tableBorderColor,
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
