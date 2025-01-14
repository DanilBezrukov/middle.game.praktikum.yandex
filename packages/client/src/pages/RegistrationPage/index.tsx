import { paths } from "@/app/constants/paths";
import { useCreateUserMutation } from "@/api/authApi";
import { IUser } from "@/types/auth.interface";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiButton } from "@/components/ui/UiButton";
import { UiTextField } from "@/components/ui/UiTextField";
import Grid from "@mui/material/Grid2";
import { REGISTRATION_FIELDS } from "@/pages/RegistrationPage/registrationFields";
import { apiTranslateResponseErrors } from "@/app/utils/validationUserFields";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const RegistrationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Omit<IUser, "id">>({
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [createUser, { error: responseError }] = useCreateUserMutation();

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

  useEffect(() => {
    if (responseError && typeof responseError === "object") {
      const { data } = responseError as FetchBaseQueryError;
      const { reason } = data as { reason: string };
      const { key, message } = apiTranslateResponseErrors(reason);

      if (!key) {
        setError("root", { message });
        return;
      }

      setError(key, { message });
    }
  }, [responseError]);

  return (
    <UiLayout>
      <UiPaper
        sx={{
          width: "750px",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            marginBottom: 3,
            textAlign: "center",
            color: "#000",
            marginTop: "30px",
          }}>
          Регистрация
        </Typography>
        <Grid container spacing={3} marginTop={8}>
          {REGISTRATION_FIELDS.map(({ label, name, type = "text", options }) => (
            <Grid key={name} size={6}>
              <UiTextField
                label={label}
                type={type}
                error={Boolean(errors[name])}
                helperText={errors[name]?.message}
                {...register(name, options)}
              />
            </Grid>
          ))}
        </Grid>
        {errors.root && (
          <Typography marginTop={4} variant="body2" color="error" sx={{ textAlign: "center" }}>
            {errors.root.message}
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
