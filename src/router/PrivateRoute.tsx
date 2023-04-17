import useTypedSelector from '@/hooks/useTypedSelector';
import { isUserLoggedIn } from '@/redux/auth/auth.selectors';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const loggedIn = useTypedSelector(isUserLoggedIn);

  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

type PrivateRouteProps = {
  children: JSX.Element;
};

export default PrivateRoute;
