import { FieldValues, RegisterOptions } from "react-hook-form";

export const requiredField = "Поле не может быть пустым";

const invalidEmail = "Некоректный email";

const invalidLogin = `Должен содержать только латинские буквы,
 от 3 до 20 символов, без пробелов, дефисов и нижних подчёркиваний`;

const invalidName = `Используйте только буквы без пробелов и цифр, 
первая буква должны быть заглавной`;

const invalidPassword = `Пароль должен быть от 8 до 40 
символов и хотя бы одной заглавной буквы`;

const invalidPhone = `Телефон долже быть от 10 до 15 символов,
 состоять из цифр`;

const namePattern = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]{2,})+$/;
const loginPattern = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
const phonePattern = /^\+?\d{10,15}$/;

export type RulesType = Record<
  "email" | "login" | "first_name" | "second_name" | "phone" | "password",
  RegisterOptions | undefined
>;
export const rules: RulesType = {
  email: {
    required: requiredField,
    pattern: { value: emailPattern, message: invalidEmail },
  },
  login: {
    required: requiredField,
    pattern: {
      value: loginPattern,
      message: invalidLogin,
    },
  },
  // eslint-disable-next-line camelcase
  first_name: {
    required: requiredField,
    pattern: { value: namePattern, message: invalidName },
  },
  // eslint-disable-next-line camelcase
  second_name: {
    required: requiredField,
    pattern: { value: namePattern, message: invalidName },
  },
  phone: {
    required: requiredField,
    pattern: {
      value: phonePattern,
      message: invalidPhone,
    },
  },
  password: {
    required: requiredField,
    pattern: {
      value: passwordPattern,
      message: invalidPassword,
    },
  },
};

export const apiTranslateResponseErrors = (
  reason: string,
): {
  key?: keyof RulesType;
  message: string;
} => {
  switch (reason) {
    case "Login already exists":
      return {
        key: "login",
        message: "Пользователь с таким логином уже существует",
      };
    case "Email already exists":
      return {
        key: "email",
        message: "Такой Email уже существует",
      };
    default:
      return { message: "Что-то пошло не так" };
  }
};
