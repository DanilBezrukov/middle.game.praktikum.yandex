import { Box, Container, Typography } from "@mui/material";
import { useLogoutMutation } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { paths } from "@/app/constants/paths";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { ProfileAvatar, ProfileInfo } from "@/pages/ProfilePage/ProfileFeatures";
import gameIcon from "@/assets/game-icon.png";
import styles from "./HomePage.module.css";

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
        <UiPaper className={styles.HomePage_UiPaper}>
          <div className={styles.HomeProfile_Container}>
            <ProfileAvatar></ProfileAvatar>
            <div className={styles.HomeProfile_Buttons}>
              <UiButton onClick={() => navigate(paths.profile)}>Страница Профиля</UiButton>
              <UiButton onClick={handleLogout}>Выход</UiButton>
            </div>
          </div>
        </UiPaper>
        <UiPaper className={styles.HomePage_UiPaper}>
          {" "}
          <nav>
            <ul className={styles.NavigationList}>
              <li>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#000000",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate(paths.forum)}>
                  Форум
                </Typography>
              </li>
              <li>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#000000",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate(paths.leaderboard)}>
                  Лидеры
                </Typography>
              </li>
            </ul>
          </nav>
        </UiPaper>
        <UiPaper className={styles.HomePage_UiPaper}>
          <div className={styles.GameDescription}>
            <img src={gameIcon} className={styles.gameIcon} alt="Game icon Flappy Bird" />
            <Typography component="h6" sx={{ mb: 2 }}>
              <strong>Flappy Bird</strong> — это простая аркадная игра, разработанная в 2013 году
              вьетнамским разработчиком Нгуен Ха Донг (Nguyen Ha Dong). Игра приобрела огромную
              популярность благодаря своей простоте и сложным механикам, несмотря на минималистичную
              графику и геймплей.
            </Typography>
          </div>
          <UiButton onClick={() => navigate(paths.game)}>Играть</UiButton>
        </UiPaper>
      </Container>
    </UiLayout>
  );
}
