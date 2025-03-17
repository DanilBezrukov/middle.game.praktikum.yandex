import { paths } from "@/app/constants/paths";
import { useCreateUserMutation } from "@/api/authApi";
import { IUser } from "@/types/auth.interface";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiButton } from "@/components/ui/UiButton";
import { UiTextField } from "@/components/ui/UiTextField";
import { REGISTRATION_FIELDS } from "@/pages/RegistrationPage/registrationFields";
import { apiTranslateResponseErrors } from "@/app/utils/validationUserFields";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const RegistrationPage: React.FC = () => {
  const { paperTextColor, tableLinkColor, theme } = useSelector((state: RootState) => state.theme);

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
            fontWeight: 600,
            textAlign: "center",
            color: paperTextColor,
            marginTop: "30px",
          }}>
          Регистрация
        </Typography>
        <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={"30px"}>
          {REGISTRATION_FIELDS.map(({ label, name, type = "text", options }) => (
            <Box key={name}>
              <UiTextField
                label={label}
                type={type}
                error={Boolean(errors[name])}
                helperText={errors[name]?.message}
                {...register(name, options)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme === "light" ? "#A8B1B0" : "rgba(255, 204, 86, 0.75)",
                    },
                    "&:hover fieldset": { borderColor: tableLinkColor },
                    "&.Mui-focused fieldset": { borderColor: tableLinkColor },
                  },
                  "& .MuiInputLabel-root": {
                    "color": paperTextColor,
                    "&.Mui-focused": { color: tableLinkColor },
                  },
                  "input": { color: paperTextColor },
                }}
              />
            </Box>
          ))}
        </Box>
        {errors.root && (
          <Typography marginTop={4} variant="body2" color="error" sx={{ textAlign: "center" }}>
            {errors.root.message}
          </Typography>
        )}
        <Box width="100%" display="flex" justifyContent="center" sx={{ marginTop: "50px" }}>
          <UiButton
            sx={{
              width: 400,
              height: 55,
              borderRadius: 3,
            }}>
            Зарегистрироваться
          </UiButton>
        </Box>

        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            textAlign: "center",
            cursor: "pointer",
            color: paperTextColor,
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
