import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseApi";

export type Leaderboard = {
  id: number;
  name: string;
  points: number;
  avatar: string;
};

const leaders: Leaderboard[] = [
  { id: 1, name: "Иван Иванов", points: 30, avatar: "https://via.placeholder.com/40" },
  { id: 2, name: "Анна Смирнова", points: 456, avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "Петр Сидоров", points: 3228, avatar: "https://via.placeholder.com/40" },
  { id: 4, name: "Ольга Фёдорова", points: 33, avatar: "https://via.placeholder.com/40" },
  { id: 5, name: "Мария Кузнецова", points: 12, avatar: "https://via.placeholder.com/40" },
];

export const leaderboardApi = createApi({
  reducerPath: "leaderboardApi",
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getLeaderboard: builder.query<Leaderboard[], void>({
      queryFn: async () => {
        try {
          const response = await fetch("https://ya-praktikum.tech/api/v2/leaderboard");
          if (!response.ok) throw new Error("Failed to fetch leaderboard");
          const data: Leaderboard[] = await response.json();
          return { data };
        } catch (error) {
          return { data: leaders };
        }
      },
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;
