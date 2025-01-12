import { Box, Container, Typography } from "@mui/material";
import { useLogoutMutation } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { paths } from "@/app/constants/paths";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { ProfileAvatar } from "@/pages/ProfilePage/ProfileFeatures";
import gameIcon from "@/assets/game-icon.png";

export function HomePage() {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => navigate(paths.signIn))
      .catch(() => navigate(paths.error));
  };

  return (
    <UiLayout>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          HOME PAGE
        </Typography>
        <UiPaper sx={{ mb: 2, p: { xs: 3, sm: 5 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <ProfileAvatar />
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
              <Box
                component="li"
                sx={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => navigate(paths.forum)}>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    color: "#000",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}>
                  Форум
                </Typography>
              </Box>
              <Box
                component="li"
                sx={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => navigate(paths.leaderboard)}>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    color: "#000",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}>
                  Лидеры
                </Typography>
              </Box>
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
