import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseApi";
import { IProfile, IProfilePassword } from "@/types/profile.interface";
import { YA_ENDPOINT } from "@/app/constants/yandexService";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: axiosBaseQuery({ serverEndpoint: YA_ENDPOINT }),
  endpoints: builder => ({
    setProfileInfo: builder.mutation<IProfile, IProfile>({
      query: data => ({
        url: "/user/profile",
        withCredentials: true,
        method: "PUT",
        data,
      }),
    }),
    setProfileAvatar: builder.mutation<IProfile, FormData>({
      query: data => ({
        url: "/user/profile/avatar",
        withCredentials: true,
        method: "PUT",
        data,
      }),
    }),
    setProfilePassword: builder.mutation<void, IProfilePassword>({
      query: data => ({
        url: "/user/password",
        withCredentials: true,
        method: "PUT",
        data,
      }),
    }),
  }),
});

export const {
  useSetProfileInfoMutation,
  useSetProfileAvatarMutation,
  useSetProfilePasswordMutation,
} = profileApi;
