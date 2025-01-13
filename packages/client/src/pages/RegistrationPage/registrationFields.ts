import { rules } from "@/app/utils/validationUserFields";
import { RegisterOptions } from "react-hook-form";
import { IUser } from "@/types/auth.interface";

export type IRegistrationFields = {
  label: string;
  name: keyof Omit<IUser, "id">;
  type?: string;
  options?: RegisterOptions;
};
export const REGISTRATION_FIELDS: IRegistrationFields[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    options: rules["email"],
  },
  {
    label: "Логин",
    name: "login",
    options: rules["login"],
  },
  {
    label: "Имя",
    name: "first_name",
    options: rules["first_name"],
  },
  {
    label: "Фамилия",
    name: "second_name",
    options: rules["second_name"],
  },
  {
    label: "Телофон",
    name: "phone",
    options: rules["phone"],
  },
  {
    label: "Пароль",
    name: "password",
    type: "password",
    options: rules["password"],
  },
];
