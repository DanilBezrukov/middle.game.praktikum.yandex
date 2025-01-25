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
    addLeader(state, action: PayloadAction<Leader>) {
      state.leaders.push(action.payload);
    },
    updateLeader(state, action: PayloadAction<Leader>) {
      const index = state.leaders.findIndex(leader => leader.id === action.payload.id);
      if (index !== -1) {
        state.leaders[index] = action.payload;
      }
    },
    removeLeader(state, action: PayloadAction<number>) {
      state.leaders = state.leaders.filter(leader => leader.id !== action.payload);
    },
  },
});

export const leaderboardActions = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;
