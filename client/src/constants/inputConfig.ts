// src/constants/inputConfig.ts
import { Role } from "../types/user";

export const registerInputs = [
  {
    label: "First Name",
    type: "text",
    name: "firstName",
    placeholder: "Enter your first name",
  },
  {
    label: "Last Name",
    type: "text",
    name: "lastName",
    placeholder: "Enter your last name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter your password",
  },
];

export const roles = [
  { value: Role.EMPLOYEE, label: "Employee" },
  { value: Role.MANAGER, label: "Manager" },
];
