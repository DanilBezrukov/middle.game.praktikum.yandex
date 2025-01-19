import { Box, Container, Typography } from "@mui/material";
import { useLogoutMutation } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { paths } from "@/app/constants/paths";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiLink } from "@/components/ui/UiLink";
import { UiPaper } from "@/components/ui/UiPaper";
import { Avatar } from "@mui/material";
import { BASE_URL } from "@/api/baseApi";
import { useAppSelector } from "@/hooks";
import gameIcon from "@/assets/game-icon.png";
import { RootState } from "@/store";
import { IProfile } from "@/types/profile.interface";

export function HomePage() {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => navigate(paths.signIn))
      .catch(() => navigate(paths.error));
  };

  const selectProfileInfo = (state: RootState) => state.profile.user as IProfile;
  const profile = useAppSelector(selectProfileInfo);

  const selectProfileAvatar = (state: RootState) => state.profile.user?.avatar;
  const avatar = useAppSelector(selectProfileAvatar);
  const AVATAR_URL = avatar ? `${BASE_URL}/resources/${avatar}` : "";

  return (
    <UiLayout>
      <Container maxWidth="md">
        <UiPaper sx={{ mb: 2, p: { xs: 3, sm: 5 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 3,
              }}>
              <Avatar sx={{ width: 120, height: 120 }} alt="User Avatar" src={AVATAR_URL} />;
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}>
                <Typography component="div" variant="h6" sx={{ fontWeight: "bold" }}>
                  <Box component="span" sx={{ marginRight: 1 }}>
                    {profile.first_name}
                  </Box>
                  <Box component="span">{profile.second_name}</Box>
                </Typography>
                <Typography component="div" variant="body2" color="text.secondary">
                  {profile.login}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}>
              <UiButton onClick={() => navigate(paths.profile)}>Страница Профиля</UiButton>
              <UiButton onClick={handleLogout}>Выход</UiButton>
            </Box>
          </Box>
        </UiPaper>
        <UiPaper sx={{ mb: 2, p: { xs: 3, sm: 5 } }}>
          <nav>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}>
              <UiLink to={paths.forum}>Форум</UiLink>
              <UiLink to={paths.leaderboard}>Лидеры</UiLink>
            </Box>
          </nav>
        </UiPaper>
        <UiPaper sx={{ mb: 2, p: { xs: 3, sm: 5 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
            }}>
            <Box
              component="img"
              src={gameIcon}
              alt="Game icon Flappy Bird"
              sx={{ maxWidth: "100px" }}
            />
            <Typography component="h6" sx={{ mb: 2 }}>
              <strong>Flappy Bird</strong> — это простая аркадная игра, разработанная в 2013 году
              вьетнамским разработчиком Нгуен Ха Донг (Nguyen Ha Dong). Игра приобрела огромную
              популярность благодаря своей простоте и сложным механикам, несмотря на минималистичную
              графику и геймплей.
            </Typography>
          </Box>
          <UiButton onClick={() => navigate(paths.game)}>Играть</UiButton>
        </UiPaper>
      </Container>
    </UiLayout>
  );
}
