import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useActions } from "@/hooks";
import { useLazyGetThemeApiQuery } from "@/api/themeApi";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const profile = useSelector((state: RootState) => state.profile.user);
  const { setTheme } = useActions();
  const [getThemeTrigger] = useLazyGetThemeApiQuery();

  useEffect(() => {
    const theme = localStorage.getItem("user-theme") || "light";
    const isThemCorrect = theme === "light" || theme === "dark";
    if (!profile) {
      if (isThemCorrect) setTheme(theme);

      return;
    }

    getThemeTrigger(profile.id).then(res => {
      if (res.isError && isThemCorrect) {
        setTheme(theme);

        return;
      }

      res.data && setTheme(res.data.theme);
    });
  }, [profile]);

  return <>{children}</>;
};
