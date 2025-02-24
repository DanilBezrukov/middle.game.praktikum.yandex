import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Leader = {
  id: number;
  name: string;
  points: number;
};

const initialState: { leaders: Leader[] } = {
  leaders: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaders(state, action: PayloadAction<Leader[]>) {
      state.leaders = action.payload;
    },
  },
});

export const leaderboardActions = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;
