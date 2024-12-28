import { Role } from '../types/user';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  userId: string;
  role: Role;
}
