import { createApi } from "@reduxjs/toolkit/query/react";
import { ILoginData, IUser, IOAuthYandexLoginData } from "@/types/auth.interface";
import { axiosBaseQuery } from "./baseApi";

export const devRedirectUri = "http://localhost:3000";
export const getYandexRedirectUrl = (serverId: string): string => {
  const params = new URLSearchParams({
    // eslint-disable-next-line camelcase
    response_type: "code",
    // eslint-disable-next-line camelcase
    client_id: serverId,
    // eslint-disable-next-line camelcase
    redirect_uri: devRedirectUri,
  });

  return `https://oauth.yandex.ru/authorize?${params.toString()}`;
};
const oAuthUrl = "/oauth/yandex";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createUser: builder.mutation<{ id: string }, Omit<IUser, "id">>({
      query: data => ({
        url: "/auth/signup",
        withCredentials: true,
        method: "POST",
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
    }),
    loginByLogin: builder.mutation<ILoginData, unknown>({
      query: data => ({
        url: "/auth/signin",
        withCredentials: true,
        method: "POST",
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
    }),
    loginByYandex: builder.mutation<{ service_id: string }, void>({
      query: () => ({
        url: `${oAuthUrl}/service-id?redirect_uri=${devRedirectUri}`,
        withCredentials: true,
        method: "GET",
      }),
    }),
    isLoginYandex: builder.mutation<void, IOAuthYandexLoginData>({
      query: data => ({
        url: oAuthUrl,
        withCredentials: true,
        method: "POST",
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
    }),
    getUserInfo: builder.query<IUser, void>({
      query: () => ({
        url: "/auth/user",
        withCredentials: true,
        method: "GET",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        withCredentials: true,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginByLoginMutation,
  useLazyGetUserInfoQuery,
  useLogoutMutation,
  useLoginByYandexMutation,
  useIsLoginYandexMutation,
} = authApi;
