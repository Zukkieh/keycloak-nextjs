'use client';

import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface RootLayoutProps {
  children: React.ReactNode;
  session: Session;
}

export const metadata: Metadata = {
  title: 'Keycloak + Next',
  description: 'keycloak next',
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({ children, session }: RootLayoutProps) {
  console.log(session)
  return (
    <SessionProvider session={session} refetchInterval={2 * 60}>
      {children}
    </SessionProvider>
  );
}
