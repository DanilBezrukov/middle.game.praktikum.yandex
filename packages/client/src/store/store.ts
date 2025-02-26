import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/api/authApi";
import { profileApi } from "@/api/profileApi";
import { profileReducer } from "./slices/profile.slice";
import { leaderboardReducer } from "./slices/leaderboard.slice";
import { leaderboardApi } from "@/api/leaderboardApi";

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState;
  }
}
export const reducer = combineReducers({
  profile: profileReducer,
  leaderboard: leaderboardReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer,
});
export const store = configureStore({
  reducer,
  preloadedState: typeof window === "undefined" ? undefined : window.APP_INITIAL_STATE,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(leaderboardApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
