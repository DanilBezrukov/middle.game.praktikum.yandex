import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LeaderData = {
  id: number;
  name: string;
  ppBirdScore: number;
};

export type LeaderboardResponse = {
  data: LeaderData;
};

const initialState: { leaders: LeaderboardResponse[] } = {
  leaders: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaders(state, action: PayloadAction<LeaderboardResponse[]>) {
      state.leaders = action.payload;
    },
  },
});

export const leaderboardActions = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;
