import api from './api';
import { RegisterRequestDto, RegisterResponseDto } from '../dto/register.dto';
import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';

export const register = async (data: RegisterRequestDto): Promise<RegisterResponseDto> => {
  const response = await api.post<RegisterResponseDto>('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginRequestDto): Promise<LoginResponseDto> => {
  const response = await api.post<LoginResponseDto>('/auth/login', data);
  return response.data;
};
