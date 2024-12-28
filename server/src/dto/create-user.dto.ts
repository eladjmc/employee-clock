import { Roles } from "../constants/roles.constant";

export class CreateUserDto {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  role!: Roles;
  manager?: string | null; // If role is EMPLOYEE, manager is required
}
