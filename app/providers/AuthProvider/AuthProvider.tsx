import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { TypeComponentAuthFields } from '@/shared/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { useActions } from '@/hooks/useActions';

const DynamicCheckRole = dynamic(() => import(`./CheckRole`), { ssr: false });

const AuthProvider: FC<TypeComponentAuthFields> = ({ children, Component: { isOnlyAdmin, isOnlyUser } }) => {
  const { user } = useAuth();

  const { logout, checkAuth } = useActions();

  const { pathname } = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get(`accessToken`);
    if (accessToken) checkAuth();
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get(`refreshToken`);
    if (!refreshToken && user) logout();
  }, [pathname]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return !isOnlyAdmin && !isOnlyUser ? <>{children}</> : (
    <DynamicCheckRole Component={{
      isOnlyAdmin,
      isOnlyUser,
    }}
    >
      {children}
    </DynamicCheckRole>
  );
};

export default AuthProvider;
