import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/api/authApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
