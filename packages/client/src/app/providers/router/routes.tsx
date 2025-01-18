import type { RouteObject } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { paths } from "@/app/constants/paths";
import { RegistrationPage } from "@/pages/RegistrationPage";
import { ErrorPage400 } from "@/pages/ErrorPage400";
import { ErrorPage500 } from "@/pages/ErrorPage500";
import { HomePage } from "@/pages/HomePage";
import { AuthGuard } from "@/app/providers/router/AuthGuard";

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
    path: paths.homePage,
    element: (
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    ),
  },
  {
    path: paths.game,
    element: (
      <AuthGuard>
        <div>Страница игры</div>
      </AuthGuard>
    ),
  },
  {
    path: paths.leaderboard,
    element: (
      <AuthGuard>
        <div>Страница лидерборда</div>
      </AuthGuard>
    ),
  },
  {
    path: paths.forum,
    element: (
      <AuthGuard>
        <div>Страница форума</div>
      </AuthGuard>
    ),
  },
  {
    path: paths.error,
    element: <ErrorPage500 />,
  },
  {
    path: "*",
    element: <ErrorPage400 />,
  },
];
