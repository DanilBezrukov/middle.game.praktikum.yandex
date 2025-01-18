import { Box, Container, Typography } from "@mui/material";
import { useLogoutMutation } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { paths } from "@/app/constants/paths";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiA } from "@/components/ui/UiA";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiAvatar } from "@/components/ui/UiAvatar";
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
              <UiAvatar />
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
              <UiA to={paths.forum}>Форум</UiA>
              <UiA to={paths.leaderboard}>Лидеры</UiA>
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
