import { Role } from '../types/user';

export interface LoginRequestDto {
  email: string;
  password: string;
}
export interface IUser {
    _id:string;
    firstName: string;   
    lastName: string;   
    email: string;       
    role: Role;
    manager?: IUser | null;
}

export interface LoginResponseDto extends IUser {
  token: string;
}
