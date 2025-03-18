import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useActions } from "@/hooks";
import { useLazyGetThemeApiQuery } from "@/api/themeApi";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const profile = useSelector((state: RootState) => state.profile.user);
  const { setTheme } = useActions();
  const [getThemeTrigger] = useLazyGetThemeApiQuery();

  useEffect(() => {
    if (!profile) return;

    getThemeTrigger(profile.id).then(res => res.data && setTheme(res.data.theme));
  }, [profile]);

  return <>{children}</>;
};
