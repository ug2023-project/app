import useTypedDispatch from '@/hooks/useTypedDispatch';
import { fetchUser } from '@/redux/auth/auth.actions';
import { ReactNode, useEffect } from 'react';

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export default AuthProvider;
