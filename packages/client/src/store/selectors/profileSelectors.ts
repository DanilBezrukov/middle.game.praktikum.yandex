/* eslint-disable camelcase */
import { RootState } from "@/store";
import { IProfile } from "@/types/profile.interface";

export const selectProfileInfo = (state: RootState): IProfile =>
  state.profile.user ?? {
    id: "",
    first_name: "",
    second_name: "",
    email: "",
    login: "",
    phone: "",
    avatar: undefined,
    display_name: "",
  };
