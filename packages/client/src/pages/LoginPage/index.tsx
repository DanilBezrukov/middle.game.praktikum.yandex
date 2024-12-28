import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import backgroundImage from "@/assets/background.png";

export const LoginPage: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "center",
    }}>
    <Box sx={{ width: 550 }}>
      <Paper
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: 650,
          maxWidth: "100%",
          height: 500,
          overflow: "auto",
          borderRadius: "3%",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
        elevation={1}
        component="form">
        <Typography variant="h3" component="h1" sx={{ margin: "30px" }}>
          Авторизация
        </Typography>
        <TextField
          label="Логин"
          variant="outlined"
          InputProps={{ sx: { borderRadius: 10, width: 400, height: 55 } }}
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          InputProps={{ sx: { borderRadius: 10, width: 400, height: 55 } }}
        />
        <Button
          variant="contained"
          type="submit"
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
          Авторизация
        </Button>
        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            textAlign: "center",
            cursor: "pointer",
            color: "#000000",
            fontWeight: "bold",
            textDecoration: "underline",
          }}>
          У вас нет аккаунта? Регистрация
        </Typography>
      </Paper>
    </Box>
  </Box>
);
