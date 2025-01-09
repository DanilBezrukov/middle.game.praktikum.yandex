import React from "react";
import { useForm } from "react-hook-form";

import { Grid } from "@mui/material";

import { IProfile } from "@/types/profile.interface";
import { useSetProfileInfoMutation } from "@/api/profileApi";
import { useActions, useAppSelector } from "@/hooks";
import { UiMessage } from "@/components/ui/UiMessage";
import { RootState } from "@/store";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiTextField } from "@/components/ui/UiTextField";
import { UiButton } from "@/components/ui/UiButton";

export const ProfileInfo: React.FC = () => {
  const [profileInfo, { isSuccess, isError }] = useSetProfileInfoMutation();

  const selectProfileInfo = (state: RootState) => state.profile.user as IProfile;

  const profile = useAppSelector(selectProfileInfo);
  const { setProfile } = useActions();

  const { register, handleSubmit } = useForm<IProfile>({
    defaultValues: profile,
  });

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
        <Grid item xs={6}>
          <UiTextField label="Почта" variant="standard" {...register("email")} />
        </Grid>
        <Grid item xs={6}>
          <UiTextField label="Логин" variant="standard" {...register("login")} />
        </Grid>
        <Grid item xs={6}>
          <UiTextField label="Имя" variant="standard" {...register("first_name")} />
        </Grid>
        <Grid item xs={6}>
          <UiTextField label="Фамилия" variant="standard" {...register("second_name")} />
        </Grid>
        <Grid item xs={12}>
          <UiTextField label="Телефон" variant="standard" type="tel" {...register("phone")} />
        </Grid>
      </Grid>
      <UiButton variant="contained" type="submit">
        Изменить
      </UiButton>
      {isSuccess && <UiMessage title="Данные пользователя успешно обновлены!" />}
      {isError && <UiMessage severity="error" title="Что то пошло не так!" />}
    </UiPaper>
  );
};
