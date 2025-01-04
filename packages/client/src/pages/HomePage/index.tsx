import { Box, Container, Typography } from "@mui/material";
import { useLogoutMutation } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import { paths } from "@/app/constants/paths";
import { UiButton } from "@/components/ui/UiButton";

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
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          HOME PAGE
        </Typography>
        <UiButton onClick={handleLogout}>Выход</UiButton>
      </Box>
    </Container>
  );
}
