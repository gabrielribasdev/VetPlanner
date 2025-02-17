import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  element: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
