import type { RouteObject } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { paths } from "@/app/constants/paths";
import { RegistrationPage } from "@/pages/RegistrationPage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { ErrorPage400 } from "@/pages/ErrorPage400";
import { HomePage } from "@/pages/HomePage";
import { ProfilePage } from "@/pages/ProfilePage";
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
    path: paths.error4,
    element: <ErrorPage400 />,
  },
  {
    path: paths.profile,
    element: (
      <AuthGuard>
        <ProfilePage />
      </AuthGuard>
    ),
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
        <LeaderboardPage />
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
    path: "/500",
    element: <div>Ошибка 500</div>,
  },
  {
    path: "*",
    element: <div>Ошибка 404</div>,
  },
];
