import React, { useState } from "react";
import { Typography } from "@mui/material";
import { UiLayout } from "@/components/ui/UiLayout";
import { ProfileAvatar, ProfileInfo } from "./ProfileFeatures";
import { ProfilePassword } from "./ProfileFeatures";
import { UiButton } from "@/components/ui/UiButton";
import { paths } from "@/app/constants/paths";
import { useNavigate } from "react-router-dom";
import { withAuthGuard } from "@/app/providers/router/withAuthGuard";

export const ProfilePage = withAuthGuard(() => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <UiLayout
      sx={{
        flexDirection: "column",
        padding: 4,
      }}>
      <Typography sx={{ fontWeight: "bold", marginTop: 4 }} variant="h4" component="h1">
        Профиль
      </Typography>

      <ProfileAvatar />

      {!isEditingPassword ? (
        <>
          <ProfileInfo />
          <UiButton
            sx={{
              marginTop: 4,
              alignSelf: "center",
              width: "300px",
              height: "50px",
            }}
            variant="contained"
            onClick={() => setIsEditingPassword(true)}>
            Изменить пароль
          </UiButton>
        </>
      ) : (
        <>
          <ProfilePassword onSuccess={() => setIsEditingPassword(false)} />
          <UiButton
            sx={{
              marginTop: 4,
              alignSelf: "center",
              width: "300px",
              height: "50px",
            }}
            variant="outlined"
            onClick={() => setIsEditingPassword(false)}>
            Назад к информации
          </UiButton>
        </>
      )}
      <UiButton
        sx={{
          marginTop: 2,
          alignSelf: "center",
          width: "300px",
          height: "50px",
          marginBottom: 4,
        }}
        onClick={() => navigate(paths.homePage)}>
        Назад
      </UiButton>
    </UiLayout>
  );
});
