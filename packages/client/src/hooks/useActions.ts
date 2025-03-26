import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import {
  profileActions,
  leaderboardActions,
  themeActions,
  AppDispatch,
  forumActions,
} from "@/store";

const rootActions = {
  ...profileActions,
  ...leaderboardActions,
  ...themeActions,
  ...forumActions,
};

const useAppDispatch: () => AppDispatch = useDispatch;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
