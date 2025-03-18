import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTheme } from "../store/slices/theme.slice";
import axios from "axios";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const profile = useSelector((state: RootState) => state.profile.user);
  const userId = profile?.id || "0000";

  const [initialThemeLoaded, setInitialThemeLoaded] = useState(false);
  const isFirstUpdate = useRef(true);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`/owner-server/theme/${userId}`)
      .then(({ data }) => {
        if (data.theme) {
          dispatch(setTheme(data.theme));
        }
        setInitialThemeLoaded(true);
      })
      .catch(error => {
        console.error("Ошибка при получении темы", error);
        setInitialThemeLoaded(true);
      });
  }, [dispatch, userId]);

  useEffect(() => {
    if (!userId || !initialThemeLoaded) return;
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return;
    }

    axios
      .post(`/owner-server/theme/${userId}`, { theme })
      .then(response => {
        if (response.status === 200) {
          console.log("Тема обновлена на сервере");
        } else {
          console.error("Ошибка при обновлении темы", response);
        }
      })
      .catch(error => {
        console.error("Ошибка при обновлении темы", error);
      });
  }, [theme, userId, initialThemeLoaded]);

  return <>{children}</>;
};
