import type { RouteObject } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { paths } from "@/app/constants/paths";
import { RegistrationPage } from "@/pages/RegistrationPage";
import { ErrorPage400 } from "@/pages/ErrorPage400";

export const routes: RouteObject[] = [
  {
    path: paths.signIn,
    element: <LoginPage />,
  },
  {
    path: paths.signUp,
    element: <RegistrationPage />,
  },
  {
    path: paths.error4,
    element: <ErrorPage400 />,
  },
  {
    path: "/profile",
    element: <div>Профиль</div>,
  },
  {
    path: "/",
    element: <div>HomePage</div>,
  },
  {
    path: "/game",
    element: <div>Страница игры</div>,
  },
  {
    path: "/leaderboard",
    element: <div>Страница лидерборда</div>,
  },
  {
    path: "/forum",
    element: <div>Страница форума</div>,
  },
  {
    path: "/500",
    element: <div>Ошибка 500</div>,
  },
  {
    path: "*",
    element: <div>Ошибка 404</div>,
  },
];
