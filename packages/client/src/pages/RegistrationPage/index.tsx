import { paths } from "@/app/constants/paths";
import { useCreateUserMutation } from "@/api/authApi";
import { IUser } from "@/types/auth.interface";
import { Typography, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiButton } from "@/components/ui/UiButton";
import { UiTextField } from "@/components/ui/UiTextField";

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
            <UiTextField label="Имя" {...register("first_name")} />
            <UiTextField label="Email" type="email" {...register("email")} />
            <UiTextField label="Логин" {...register("login")} />
          </Grid>
          <Grid item xs={6}>
            <UiTextField label="Фамилия" {...register("second_name")} />
            <UiTextField label="Телефон" {...register("phone")} />
            <UiTextField label="Пароль" type="password" {...register("password")} />
          </Grid>
        </Grid>
        {isError && (
          <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
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
