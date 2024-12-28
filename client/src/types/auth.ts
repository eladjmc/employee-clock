import { LoginResponseDto } from '../dto/login.dto';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginResponseDto | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
