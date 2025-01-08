import React, { ChangeEvent } from "react";

import { Avatar, Box, IconButton } from "@mui/material";

import { useSetProfileAvatarMutation } from "@/api/profileApi";
import { BASE_URL } from "@/api/baseApi";
import { useActions, useAppSelector } from "@/hooks";
import { Message } from "@/components/ui/UiMessage";
import { RootState } from "@/store";

export const ProfileAvatar: React.FC = () => {
  const [profileAvatar, { isSuccess, isError }] = useSetProfileAvatarMutation();

  const selectProfileAvatar = (state: RootState) => state.profile.user?.avatar;

  const avatar = useAppSelector(selectProfileAvatar);
  const { setProfile } = useActions();

  const AVATAR_URL = `${BASE_URL}/resources/${avatar}`;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) return;

    const formData = new FormData();
    formData.append("avatar", event.target.files[0]);

    await profileAvatar(formData).unwrap().then(setProfile);
  };

  return (
    <>
      <Box sx={{ marginTop: 2 }}>
        <input
          hidden
          type="file"
          accept="image/*"
          id="profile-avatar"
          onChange={handleFileChange}
        />
        <label htmlFor="profile-avatar">
          <IconButton component="span">
            <Avatar sx={{ width: 120, height: 120 }} alt="Avatar" src={AVATAR_URL} />
          </IconButton>
        </label>
      </Box>
      {isSuccess && <Message title="Успех!" />}
      {isError && <Message severity="error" title="Что то пошло не так!" />}
    </>
  );
};
