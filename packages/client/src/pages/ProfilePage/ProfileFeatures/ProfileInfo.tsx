import React from "react";
import { useForm } from "react-hook-form";

import { Grid } from "@mui/material";

import { IProfile } from "@/types/profile.interface";
import { useSetProfileInfoMutation } from "@/api/profileApi";
import { useActions, useAppSelector } from "@/hooks";
import { Message } from "@/components/ui/UiMessage";
import { RootState } from "@/store";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiTextField } from "@/components/ui/UiTextField";
import { UiButton } from "@/components/ui/UiButton";

export const ProfileInfo: React.FC = () => {
  const [profileInfo, { isSuccess, isError }] = useSetProfileInfoMutation();

  const selectProfileInfo = (state: RootState) => state.profile.user as IProfile;

  const profile = useAppSelector(selectProfileInfo);
  const { setProfile } = useActions();

  const { register, handleSubmit } = useForm<IProfile>();

  const onSubmit = handleSubmit(async formData => {
    await profileInfo(formData).unwrap().then(setProfile);
  });

  return (
    <UiPaper
      component="form"
      sx={{
        width: "600px",
        padding: 4,
        borderRadius: 3,
      }}
      onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item>
          <UiTextField
            label="Почта"
            variant="standard"
            {...register("email")}
            defaultValue={profile.email}
          />
        </Grid>
        <Grid item>
          <UiTextField
            label="Логин"
            variant="standard"
            {...register("login")}
            defaultValue={profile.login}
          />
        </Grid>
        <Grid item>
          <UiTextField
            label="Имя"
            variant="standard"
            {...register("first_name")}
            defaultValue={profile.first_name}
          />
        </Grid>
        <Grid item>
          <UiTextField
            label="Фамилия"
            variant="standard"
            {...register("second_name")}
            defaultValue={profile.second_name}
          />
        </Grid>
        <Grid item>
          <UiTextField
            label="Телефон"
            variant="standard"
            type="tel"
            {...register("phone")}
            defaultValue={profile.phone}
          />
        </Grid>
      </Grid>
      <UiButton variant="contained" type="submit">
        Изменить
      </UiButton>
      {isSuccess && <Message title="Данные пользователя успешно обновлены!" />}
      {isError && <Message severity="error" title="Что то пошло не так!" />}
    </UiPaper>
  );
};
