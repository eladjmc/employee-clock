import { Role } from '../types/user';

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  manager?: string | null;
}

export interface RegisterResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  managerId?: string | null;
}
