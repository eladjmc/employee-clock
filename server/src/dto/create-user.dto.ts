import { Roles } from "../constants/roles.constant";

export class CreateUserDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  role!: Roles;
  manager?: string; // If role = EMPLOYEE, manager is required
}
