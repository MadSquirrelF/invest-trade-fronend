import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { TypeComponentAuthFields } from '@/shared/types/auth.types';

const CheckRole: FC<TypeComponentAuthFields> = ({ children, Component: { isOnlyAdmin, isOnlyUser } }) => {
  const { user } = useAuth();

  const router = useRouter();

  // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-no-useless-fragment
  const Children = () => <>{children}</>;

  if (user?.isAdmin) return <Children />;

  if (isOnlyAdmin) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    router.pathname !== `/404` && router.replace(`/404`);
    return null;
  }

  const isUser = user && !user.isAdmin;

  if (isUser && isOnlyUser) return <Children />;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  router.pathname !== `/` && router.replace(`/`);
  return null;
};

export default CheckRole;
