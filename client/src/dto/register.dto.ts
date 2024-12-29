import { Role } from '../types/user';

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  manager: string;
  [key: string]: unknown; // Allows dynamic key access
}


export interface RegisterResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  managerId?: string | null;
}
