import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseApi";

export const leaderboardApi = createApi({
  reducerPath: "leaderboardApi",
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    submitLeaderboard: builder.mutation<
      void,
      {
        data: { name: string; ppBirdScore: number };
        ratingFieldName: string;
        teamName: string;
      }
    >({
      query: data => ({
        url: "/leaderboard",
        method: "POST",
        data,
        withCredentials: true,
      }),
    }),
    getLeaderboard: builder.query<
      any,
      {
        ratingFieldName: string;
        cursor: number;
        limit: number;
        cookie?: string;
      }
    >({
      query: params => ({
        url: "/leaderboard/all",
        method: "POST",
        data: params,
        headers: {
          cookie: params?.cookie ? params.cookie : undefined,
        },
        withCredentials: true,
      }),
    }),
  }),
});

export const { useSubmitLeaderboardMutation, useGetLeaderboardQuery } = leaderboardApi;
