import { paths } from "@/app/constants/paths";
import { useCreateUserMutation } from "@/api/authApi";
import { IUser } from "@/types/types";
import { TextField, Typography, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiButton } from "@/components/ui/UiButton";

export const RegistrationPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Omit<IUser, "id">>();
  const navigate = useNavigate();
  const [createUser, { isError }] = useCreateUserMutation();

  const onSubmit = (data: Omit<IUser, "id">) => {
    createUser(data)
      .unwrap()
      .then(() => {
        reset();
        navigate(paths.homePage);
      })
      .catch(e => {
        if (e.status >= 500) {
          navigate(paths.error);
        }
      });
  };

  return (
    <UiLayout>
      <UiPaper
        sx={{
          width: "750px",
          padding: 4,
          borderRadius: 3,
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}>
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
              {...register("first_name")}
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              {...register("email")}
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
            <TextField
              label="Логин"
              variant="outlined"
              fullWidth
              {...register("login")}
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Фамилия"
              variant="outlined"
              fullWidth
              {...register("second_name")}
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
            <TextField
              label="Телефон"
              variant="outlined"
              fullWidth
              {...register("phone")}
              InputProps={{ sx: { borderRadius: 10, marginBottom: "20px" } }}
            />
            <TextField
              label="Пароль"
              variant="outlined"
              fullWidth
              type="password"
              {...register("password")}
              InputProps={{ sx: { borderRadius: 10 } }}
            />
          </Grid>
        </Grid>
        {isError && (
          <Typography
            variant="body2"
            color="error"
            sx={{ textAlign: "center" }}>
            Что-то пошло не так
          </Typography>
        )}
        <Grid
          container
          justifyContent="center"
          sx={{
            marginTop: "50px",
          }}>
          <UiButton
            sx={{
              width: 400,
              height: 55,
              borderRadius: 3,
            }}>
            Зарегистрироваться
          </UiButton>
        </Grid>
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
          onClick={() => navigate(paths.signIn)}>
          Уже есть аккаунт? Войти
        </Typography>
      </UiPaper>
    </UiLayout>
  );
};
