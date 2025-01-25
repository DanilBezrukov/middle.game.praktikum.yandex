import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/api/authApi";
import { profileApi } from "@/api/profileApi";
import { profileReducer } from "./slices/profile.slice";
import { leaderboardReducer } from "./slices/leaderboard.slice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    leaderboard: leaderboardReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(profileApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
