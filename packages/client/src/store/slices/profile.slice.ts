import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfile } from "@/types/profile.interface";

const initialState: { user: IProfile | null } = {
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IProfile>) {
      state.user = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
