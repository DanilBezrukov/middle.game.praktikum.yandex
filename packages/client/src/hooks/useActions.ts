import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { bindActionCreators } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store";
import { profileActions, leaderboardActions, themeActions } from "@/store";

const rootActions = {
  ...profileActions,
  ...leaderboardActions,
  ...themeActions,
};

const useAppDispatch: () => AppDispatch = useDispatch;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
