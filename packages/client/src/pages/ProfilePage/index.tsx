import { ProfileAvatar, ProfileInfo, ProfilePassword } from "./ProfileFeatures";
import { Typography } from "@mui/material";
import React from "react";
import { UiLayout } from "@/components/ui/UiLayout";

export const ProfilePage: React.FC = () => (
  <UiLayout
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: "100vh",
    }}>
    <Typography sx={{ fontWeight: "bold" }} variant="h4" component="h1">
      Профиль
    </Typography>

    <ProfileAvatar />
    <ProfileInfo />
    <ProfilePassword />
  </UiLayout>
);
