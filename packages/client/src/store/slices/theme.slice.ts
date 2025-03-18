import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import backgroundLight from "@/assets/background.png";
import backgroundDark from "@/assets/background-night.png";
import backgroundGameLight from "@/assets/background-game.png";
import backgroundGameDark from "@/assets/background-game-night.png";

type ThemeState = {
  theme: "light" | "dark";
  gameBackground: string;
  gameWindowBackground: string;
  paperTextColor: string;
  tableLinkColor: string;
  tableTextColor: string;
  tableBorderColor: string;
};

const initialState: ThemeState = {
  theme: "light",
  gameBackground: `url(${backgroundLight})`,
  gameWindowBackground: `url(${backgroundGameLight})`,
  paperTextColor: "black",
  tableLinkColor: "#1976d2",
  tableTextColor: "#000",
  tableBorderColor: "gray",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      state.gameBackground =
        action.payload === "light" ? `url(${backgroundLight})` : `url(${backgroundDark})`;
      state.gameWindowBackground =
        action.payload === "light" ? `url(${backgroundGameLight})` : `url(${backgroundGameDark})`;
      state.paperTextColor = action.payload === "light" ? "black" : "#FFE993";
      state.tableLinkColor = action.payload === "light" ? "#1976d2" : "#FFCC56";
      state.tableTextColor = action.payload === "light" ? "#000" : "#FFE993";
      state.tableBorderColor = action.payload === "light" ? "gray" : "#FFCC56";
    },
    toggleTheme: state => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      state.gameBackground =
        newTheme === "light" ? `url(${backgroundLight})` : `url(${backgroundDark})`;
      state.gameWindowBackground =
        newTheme === "light" ? `url(${backgroundGameLight})` : `url(${backgroundGameDark})`;
      state.paperTextColor = newTheme === "light" ? "black" : "#FFE993";
      state.tableLinkColor = newTheme === "light" ? "#1976d2" : "#FFCC56";
      state.tableTextColor = newTheme === "light" ? "#000" : "#FFE993";
      state.tableBorderColor = newTheme === "light" ? "gray" : "#FFCC56";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
