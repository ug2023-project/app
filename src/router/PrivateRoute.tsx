import useTypedSelector from '@/hooks/useTypedSelector';
import { isFetchingUser, isUserLoggedIn } from '@/redux/auth/auth.selectors';
import { Navigate, Outlet } from 'react-router-dom';

import styles from './PrivateRoute.module.css';
import React from 'react';

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const loggedIn = useTypedSelector(isUserLoggedIn);
  const isLoading = useTypedSelector(isFetchingUser);

  if (isLoading) return <div className={styles.loader}></div>;

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default PrivateRoute;
