import { paths } from "@/app/constants/paths";
import { useLazyGetUserInfoQuery, useLoginByLoginMutation } from "@/api/authApi";
import { ILoginData } from "@/types/auth.interface";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiButton } from "@/components/ui/UiButton";
import { UiTextField } from "@/components/ui/UiTextField";

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ILoginData>();
  const navigate = useNavigate();
  const [loginByLogin, { isError }] = useLoginByLoginMutation();
  const [getUserInfo] = useLazyGetUserInfoQuery();

  useEffect(() => {
    getUserInfo()
      .unwrap()
      .then(() => {
        navigate(paths.homePage);
      });
  }, []);

  const onSubmit = (data: ILoginData) => {
    loginByLogin(data)
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          overflow: "auto",
          borderRadius: "3%",
          width: 550,
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h1" sx={{ margin: "30px" }}>
          Авторизация
        </Typography>
        <UiTextField
          label="Логин"
          variant="outlined"
          {...register("login")}
          InputProps={{ sx: { borderRadius: 10, width: 400, height: 55 } }}
        />
        <UiTextField
          label="Пароль"
          variant="outlined"
          type="password"
          {...register("password")}
          InputProps={{ sx: { borderRadius: 10, width: 400, height: 55 } }}
        />
        {isError && (
          <Typography variant="body2" color="error">
            Неправильный логин или пароль
          </Typography>
        )}
        <UiButton
          sx={{
            width: 400,
            height: 55,
            marginTop: "50px",
          }}>
          Авторизация
        </UiButton>
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
          onClick={() => navigate(paths.signUp)}>
          У вас нет аккаунта? Регистрация
        </Typography>
      </UiPaper>
    </UiLayout>
  );
};
