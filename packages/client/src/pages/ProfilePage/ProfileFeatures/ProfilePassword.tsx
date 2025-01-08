import React from "react";
import { useForm } from "react-hook-form";

import { Grid } from "@mui/material";
import { IProfilePassword } from "@/types/profile.interface";
import { useSetProfilePasswordMutation } from "@/api/profileApi";
import { Message } from "@/components/ui/UiMessage";
import { paths } from "@/app/constants/paths";
import { UiButton } from "@/components/ui/UiButton";
import { useNavigate } from "react-router-dom";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiTextField } from "@/components/ui/UiTextField";

export const ProfilePassword: React.FC = () => {
  const navigate = useNavigate();
  const [profilePassword, { isSuccess, isError }] = useSetProfilePasswordMutation();

  const { register, handleSubmit } = useForm<IProfilePassword>();

  const onSubmit = handleSubmit(async formData => {
    await profilePassword(formData);
  });

  return (
    <UiPaper
      component="form"
      sx={{ padding: 4, width: 600, borderRadius: 3, marginTop: 2 }}
      onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item>
          <UiTextField
            label="Старый пароль"
            variant="standard"
            type="password"
            {...register("oldPassword")}
          />
        </Grid>
        <Grid item>
          <UiTextField
            label="Новый пароль"
            variant="standard"
            type="password"
            {...register("newPassword")}
          />
        </Grid>
      </Grid>
      <UiButton variant="contained" type="submit">
        Поменять пароль
      </UiButton>
      <UiButton sx={{ marginTop: 3 }} onClick={() => navigate(paths.homePage)}>
        Назад
      </UiButton>
      {isSuccess && <Message title="Пароль успешно изменен!" />}
      {isError && <Message severity="error" title="Что то пошло не так!" />}
    </UiPaper>
  );
};
