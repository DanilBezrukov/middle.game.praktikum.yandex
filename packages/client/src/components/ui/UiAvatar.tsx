import React from "react";
import { Avatar } from "@mui/material";
import { BASE_URL } from "@/api/baseApi";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";

export const UiAvatar: React.FC = () => {
  const selectProfileAvatar = (state: RootState) => state.profile.user?.avatar;
  const avatar = useAppSelector(selectProfileAvatar);

  const AVATAR_URL = avatar ? `${BASE_URL}/resources/${avatar}` : "";

  return <Avatar sx={{ width: 120, height: 120 }} alt="User Avatar" src={AVATAR_URL} />;
};
