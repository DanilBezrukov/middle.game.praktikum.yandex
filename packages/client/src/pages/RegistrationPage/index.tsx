import { Box, Button, Paper, TextField, Typography, Grid } from "@mui/material";
import backgroundImage from "@/assets/background.png";

export const RegistrationPage: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "center",
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
    }}>
    <Box sx={{ width: 750 }}>
      <Paper
        sx={{
          padding: "70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          width: 750,
          maxWidth: "100%",
          height: "auto",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
        elevation={3}
        component="form">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            marginBottom: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: "#000",
            marginTop: "30px",
          }}>
          Регистрация
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Имя"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
            <TextField
              label="Логин"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Фамилия"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
            <TextField
              label="Телефон"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
            <TextField
              label="Пароль"
              variant="outlined"
              fullWidth
              type="password"
              InputProps={{ sx: { borderRadius: 10 } }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            width: 400,
            height: 55,
            backgroundColor: "#FFE600",
            color: "#000",
            borderRadius: 3,
            marginTop: "50px",
            typography: {
              fontSize: "17px",
              fontWeight: "bold",
            },
          }}>
          Зарегистрироваться
        </Button>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            cursor: "pointer",
            color: "#000000",
            fontWeight: "bold",
            textDecoration: "underline",
          }}>
          Уже есть аккаунт? Войти
        </Typography>
      </Paper>
    </Box>
  </Box>
);
