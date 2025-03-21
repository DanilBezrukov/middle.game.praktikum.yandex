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
import { GamePage } from "@/pages/GamePage/GamePage";
import { SocialAuthPage } from "@/pages/SocialAuthPage";

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
    element: <ProfilePage />,
  },
  {
    path: paths.homePage,
    element: <HomePage />,
  },
  {
    path: paths.game,
    element: <GamePage />,
  },
  {
    path: paths.leaderboard,
    element: <LeaderboardPage />,
  },
  {
    path: paths.forum,
    element: <ForumPage />,
  },
  {
    path: paths.forumTopic, // Новый маршрут для темы форума
    element: <ForumTopicPage />,
  },
  {
    path: paths.error,
    element: <ErrorPage500 />,
  },
  {
    path: paths.socialAuthPage,
    element: <SocialAuthPage />,
  },
  {
    path: "*",
    element: <ErrorPage400 />,
  },
];
