// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Definir tipos para o estado do usuário e funções de autenticação
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
    return localStorage.getItem('authToken') !== null;
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
