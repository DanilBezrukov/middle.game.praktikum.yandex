import React, { ChangeEvent } from "react";

import { Avatar, Box, IconButton } from "@mui/material";

import { useSetProfileAvatarMutation } from "@/api/profileApi";
import { useActions, useAppSelector } from "@/hooks";
import { UiMessage } from "@/components/ui/UiMessage";
import { RootState } from "@/store";
import { YA_RESOURCES } from "@/app/constants/yandexService";

export const ProfileAvatar: React.FC = () => {
  const [profileAvatar, { isSuccess, isError }] = useSetProfileAvatarMutation();

  const selectProfileAvatar = (state: RootState) => state.profile.user?.avatar;

  const avatar = useAppSelector(selectProfileAvatar);
  const { setProfile } = useActions();

  const AVATAR_URL = `${YA_RESOURCES}/${avatar}`;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;

    if (!files || files.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", files[0]);

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
            <Avatar
              sx={{ width: 120, height: 120 }}
              alt="Avatar"
              src={avatar ? AVATAR_URL : undefined}
            />
          </IconButton>
        </label>
      </Box>
      {isSuccess && <UiMessage title="Успех!" />}
      {isError && <UiMessage severity="error" title="Что то пошло не так!" />}
    </>
  );
};
