import React, { createContext, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1])); 

    const expiration = payload.exp; 
    const currentTime = Math.floor(Date.now() / 1000); 

    return expiration > currentTime;
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
