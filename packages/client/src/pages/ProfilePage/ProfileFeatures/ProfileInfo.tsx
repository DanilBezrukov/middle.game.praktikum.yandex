import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IProfile } from "@/types/profile.interface";
import { useSetProfileInfoMutation } from "@/api/profileApi";
import { useActions, useAppSelector } from "@/hooks";
import { UiMessage } from "@/components/ui/UiMessage";
import { RootState } from "@/store";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiTextField } from "@/components/ui/UiTextField";
import { UiButton } from "@/components/ui/UiButton";
import Grid from "@mui/material/Grid2";
import { PROFILE_FIELDS } from "@/pages/ProfilePage/ProfileFeatures/profileFields";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { apiTranslateResponseErrors } from "@/app/utils/validationUserFields";

export const ProfileInfo: React.FC = () => {
  const [profileInfo, { isSuccess, error: responseError }] = useSetProfileInfoMutation();

  const selectProfileInfo = (state: RootState) => state.profile.user as IProfile;

  const profile = useAppSelector(selectProfileInfo);
  const { setProfile } = useActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
  } = useForm<IProfile>({
    mode: "onBlur",
    defaultValues: profile,
  });

  useEffect(() => {
    if (responseError && typeof responseError === "object") {
      const { data } = responseError as FetchBaseQueryError;
      const { reason } = data as { reason: string };
      const { key, message } = apiTranslateResponseErrors(reason);

      if (!key) {
        setError("root", { message });
        return;
      }

      setError(key as keyof IProfile, { message });
    }
  }, [responseError]);

  const onSubmit = handleSubmit(async formData => {
    await profileInfo(formData).unwrap().then(setProfile);
  });

  return (
    <UiPaper
      component="form"
      sx={{
        width: "600px",
        padding: 4,
      }}
      onSubmit={onSubmit}>
      <Grid container spacing={4}>
        {PROFILE_FIELDS.map(({ name, label, options, type = "text" }) => (
          <Grid key={name} size={6}>
            <UiTextField
              label={label}
              variant="standard"
              type={type}
              error={Boolean(errors[name])}
              helperText={errors[name]?.message}
              {...register(name, options)}
            />
          </Grid>
        ))}
      </Grid>
      <UiButton
        variant="contained"
        type="submit"
        disabled={!isDirty}
        sx={{
          marginTop: 6,
        }}>
        Изменить
      </UiButton>

      {isSuccess && <UiMessage title="Данные пользователя успешно обновлены!" />}
      {errors.root && <UiMessage severity="error" title={errors.root.message} />}
    </UiPaper>
  );
};
