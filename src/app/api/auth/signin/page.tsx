'use client';
import useAuthenticated from '@/hooks/useAuthenticated';

const SignIn = () => {
  useAuthenticated('/inicio');
  return null;
};

export default SignIn;
