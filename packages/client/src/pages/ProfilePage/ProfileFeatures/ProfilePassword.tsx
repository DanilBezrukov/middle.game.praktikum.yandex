import React from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import { IProfilePassword } from "@/types/profile.interface";
import { useSetProfilePasswordMutation } from "@/api/profileApi";
import { UiMessage } from "@/components/ui/UiMessage";
import { UiButton } from "@/components/ui/UiButton";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiTextField } from "@/components/ui/UiTextField";
import Grid from "@mui/material/Grid2";
import { requiredField, rules } from "@/app/utils/validationUserFields";

export const ProfilePassword: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [profilePassword, { isSuccess, isError }] = useSetProfilePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProfilePassword>();

  const onSubmit = handleSubmit(async formData => {
    await profilePassword(formData)
      .unwrap()
      .then(() => {
        reset();
        onSuccess();
      });
  });

  return (
    <UiPaper component="form" sx={{ padding: 4, width: 600, marginTop: 2 }} onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid size={6}>
          <UiTextField
            label="Старый пароль"
            variant="standard"
            type="password"
            error={Boolean(errors.oldPassword)}
            helperText={errors.oldPassword?.message}
            {...register("oldPassword", {
              required: requiredField,
            })}
          />
        </Grid>
        <Grid size={6}>
          <UiTextField
            label="Новый пароль"
            variant="standard"
            type="password"
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword?.message}
            {...register("newPassword", rules.password as RegisterOptions<IProfilePassword>)}
          />
        </Grid>
      </Grid>
      <UiButton
        variant="contained"
        type="submit"
        sx={{
          marginTop: 6,
        }}>
        Поменять пароль
      </UiButton>
      {isSuccess && <UiMessage title="Пароль успешно изменен!" />}
      {isError && <UiMessage severity="error" title="Что то пошло не так!" />}
    </UiPaper>
  );
};
