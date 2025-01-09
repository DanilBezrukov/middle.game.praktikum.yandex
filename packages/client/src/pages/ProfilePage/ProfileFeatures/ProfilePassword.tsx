import React from "react";
import { useForm } from "react-hook-form";

import { Grid } from "@mui/material";
import { IProfilePassword } from "@/types/profile.interface";
import { useSetProfilePasswordMutation } from "@/api/profileApi";
import { UiMessage } from "@/components/ui/UiMessage";
import { UiButton } from "@/components/ui/UiButton";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiTextField } from "@/components/ui/UiTextField";

export const ProfilePassword: React.FC = () => {
  const [profilePassword, { isSuccess, isError }] = useSetProfilePasswordMutation();

  const { register, handleSubmit } = useForm<IProfilePassword>();

  const onSubmit = handleSubmit(async formData => {
    await profilePassword(formData);
  });

  return (
    <UiPaper component="form" sx={{ padding: 4, width: 600, marginTop: 2 }} onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <UiTextField
            label="Старый пароль"
            variant="standard"
            type="password"
            {...register("oldPassword")}
          />
        </Grid>
        <Grid item xs={6}>
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
      {isSuccess && <UiMessage title="Пароль успешно изменен!" />}
      {isError && <UiMessage severity="error" title="Что то пошло не так!" />}
    </UiPaper>
  );
};
