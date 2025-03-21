import { IProfile, IProfileFields } from "@/types/profile.interface";
import { rules } from "@/app/utils/validationUserFields";
import { RegisterOptions } from "react-hook-form";

export const PROFILE_FIELDS: IProfileFields[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    options: rules.email as RegisterOptions<IProfile>,
  },
  {
    name: "login",
    label: "Логин",
    options: rules.login as RegisterOptions<IProfile>,
  },
  {
    name: "phone",
    label: "Телефон",
    options: rules.phone as RegisterOptions<IProfile>,
  },
  {
    name: "first_name",
    label: "Имя",
    options: rules.first_name as RegisterOptions<IProfile>,
  },
  {
    name: "second_name",
    label: "Фамилия",
    options: rules.second_name as RegisterOptions<IProfile>,
  },
];
