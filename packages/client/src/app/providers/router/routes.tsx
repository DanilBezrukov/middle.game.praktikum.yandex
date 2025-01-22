import type { RouteObject } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { paths } from "@/app/constants/paths";
import { RegistrationPage } from "@/pages/RegistrationPage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { ErrorPage400 } from "@/pages/ErrorPage400";
import { ErrorPage500 } from "@/pages/ErrorPage500";
import { HomePage } from "@/pages/HomePage";
import { ForumPage } from "@/pages/ForumPage";
import { ForumTopicPage } from "@/pages/ForumTopicPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AuthGuard } from "@/app/providers/router/AuthGuard";
import { GamePage } from "@/pages/GamePage/GamePage";

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
        <GamePage />
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
        <ForumPage />,
      </AuthGuard>
    ),
  },
  {
    path: paths.forumTopic, // Новый маршрут для темы форума
    element: (
      <AuthGuard>
        <ForumTopicPage />
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
