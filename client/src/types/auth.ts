import { Role } from './user';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    userId: string;
    role: Role;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
