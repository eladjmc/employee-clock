import api from './api';
import { User } from '../types/user';

// Im not gonna use it but its here incase i would want to add this function later on...
// I can also add the "create user" here instead of register in the auth if I want to

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users');
  return response.data;
};

