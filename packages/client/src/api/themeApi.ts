import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/api/baseApi";

type UserIdType = number | string;

type ThemeResponseApi = {
  id: number;
  userId: number;
  theme: "light" | "dark";
  createdAt: string;
  updatedAt: string;
};
export const themeApi = createApi({
  reducerPath: "themeApi",
  baseQuery: axiosBaseQuery({ serverEndpoint: "/owner-server" }),
  endpoints: builder => ({
    getThemeApi: builder.query<ThemeResponseApi, UserIdType>({
      query: userId => ({
        url: `/theme/${userId}`,
        method: "GET",
      }),
    }),
    setThemeApi: builder.mutation<unknown, { userId: UserIdType; theme: string }>({
      query: ({ userId, theme }) => ({
        url: `/theme/${userId}`,
        method: "POST",
        data: { theme },
      }),
    }),
  }),
});

export const { useSetThemeApiMutation, useLazyGetThemeApiQuery } = themeApi;
