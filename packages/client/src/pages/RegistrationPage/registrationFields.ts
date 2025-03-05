import { rules } from "@/app/utils/validationUserFields";
import { IUser } from "@/types/auth.interface";
import { RegisterOptions } from "react-hook-form";

export type IRegistrationFields = {
  label: string;
  name: keyof Omit<IUser, "id">;
  type?: string;
  options?: RegisterOptions<Omit<IUser, "id">>;
};
export const REGISTRATION_FIELDS: IRegistrationFields[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    options: rules.email as RegisterOptions<Omit<IUser, "id">>,
  },
  {
    label: "Логин",
    name: "login",
    options: rules.login as RegisterOptions<Omit<IUser, "id">>,
  },
  {
    label: "Имя",
    name: "first_name",
    options: rules.first_name as RegisterOptions<Omit<IUser, "id">>,
  },
  {
    label: "Фамилия",
    name: "second_name",
    options: rules.second_name as RegisterOptions<Omit<IUser, "id">>,
  },
  {
    label: "Телефон",
    name: "phone",
    options: rules.phone as RegisterOptions<Omit<IUser, "id">>,
  },
  {
    label: "Пароль",
    name: "password",
    type: "password",
    options: rules.password as RegisterOptions<Omit<IUser, "id">>,
  },
];
