import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Leader = {
  id: number;
  name: string;
  points: number;
  avatar: string;
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
