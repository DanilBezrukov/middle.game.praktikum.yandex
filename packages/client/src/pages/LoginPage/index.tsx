import { paths } from "@/app/constants/paths";
import {
  getYandexRedirectUrl,
  useLazyGetUserInfoQuery,
  useLoginByLoginMutation,
  useLoginByYandexMutation,
} from "@/api/authApi";
import { ILoginData } from "@/types/auth.interface";
import { SvgIcon, Typography } from "@mui/material";
import { YandexIcon } from "@/components/ui/YandexIcon";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiButton } from "@/components/ui/UiButton";
import { UiTextField } from "@/components/ui/UiTextField";
import { requiredField } from "@/app/utils/validationUserFields";

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginData>({
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [loginByLogin, { isError: isResponseError }] = useLoginByLoginMutation();
  const [getUserInfo] = useLazyGetUserInfoQuery();
  const [loginByYandex] = useLoginByYandexMutation();

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

  const onLoginByYandex = () => {
    loginByYandex()
      .unwrap()
      .then(res => {
        window.open(getYandexRedirectUrl(res.service_id), "_blank");
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error("Error during Yandex login:", error);
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
          error={Boolean(errors.login)}
          helperText={errors.login?.message}
          {...register("login", {
            required: requiredField,
          })}
        />
        <UiTextField
          label="Пароль"
          type="password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register("password", {
            required: requiredField,
          })}
        />
        {isResponseError && (
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
        <UiButton
          sx={{
            width: 400,
            height: 55,
            color: "#FFFFFF",
            backgroundColor: "#000000",
            textTransform: "uppercase",
          }}
          onClick={onLoginByYandex}>
          <SvgIcon style={{ marginRight: "10px" }}>
            <YandexIcon />
          </SvgIcon>
          Авторизация через Яндекс
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
