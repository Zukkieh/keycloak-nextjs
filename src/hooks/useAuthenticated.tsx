import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function useAuthenticated(route?: string) {
  const { status, data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data?.error === 'RefreshAccessTokenError') {
      void signIn('keycloak');
    }
    if (status === 'unauthenticated') {
      signIn('keycloak', { redirect: true });
    }
    if (status === 'authenticated' && route) {
      void router.push(route);
    }
  }, [data?.error, status, router, route]);

  return data;
}
