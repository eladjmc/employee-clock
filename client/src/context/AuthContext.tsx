import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType } from '../types/auth';
import { login as loginUserService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Role } from '../types/user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ userId: string; role: Role } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginUserService({ email, password });
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify({ userId: response.userId, role: response.role }));
    setIsAuthenticated(true);
    setUser({ userId: response.userId, role: response.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
