import { IUser } from "./auth.interface";
import { RegisterOptions } from "react-hook-form";

export type IProfile = Omit<IUser, "password">;

export type IProfilePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IProfileFields = {
  label: string;
  name: keyof Omit<IProfile, "id">;
  type?: string;
  options?: RegisterOptions<IProfile>;
};
