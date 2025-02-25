import ReactDOM from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "@/app/providers/router/routes";
import { createFetchRequest } from "@/app/utils/entry-server.utils";
import express from "express";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "@/store/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { authApi } from "@/api/authApi";
import { profileApi } from "@/api/profileApi";
import { leaderboardApi } from "@/api/leaderboardApi";
import { profileActions } from "@/store";

export const render = async (req: express.Request) => {
  const { query, dataRoutes } = createStaticHandler(routes);

  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(profileApi.middleware)
        .concat(leaderboardApi.middleware),
  });

  const { setProfile } = profileActions;

  const cookie = Object.entries(req.cookies)
    .map(([key, val]) => `${key}=${val}`)
    .join(";");

  await store.dispatch(leaderboardApi.endpoints.getLeaderboard.initiate());

  await store
    .dispatch(authApi.endpoints.getUserInfo.initiate({ cookie }))
    .then(res => res.data && store.dispatch(setProfile(res.data)));

  return {
    appHtml: ReactDOM.renderToString(
      <Provider store={store}>
        <CssBaseline />
        <StaticRouterProvider context={context} router={router} />
      </Provider>,
    ),
    initialState: store.getState(),
  };
};
