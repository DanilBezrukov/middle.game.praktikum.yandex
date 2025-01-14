import { IProfileFields } from "@/types/profile.interface";
import { rules } from "@/app/utils/validationUserFields";

export const PROFILE_FIELDS: IProfileFields[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    options: rules.email,
  },
  {
    name: "login",
    label: "Логин",
    options: rules.login,
  },
  {
    name: "display_name",
    label: "Никнейм",
  },
  {
    name: "phone",
    label: "Телефон",
    options: rules.phone,
  },
  {
    name: "first_name",
    label: "Имя",
    options: rules.first_name,
  },
  {
    name: "second_name",
    label: "Фамилия",
    options: rules.second_name,
  },
];
