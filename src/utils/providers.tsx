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
  return (
    // In my case, just for test purposes, I defined the SSO Idle Session and Access Token Lifespan to be 2 minutes. So the refresh interval will be 1 minute
    <SessionProvider session={session} refetchInterval={1 * 60}>
      {children}
    </SessionProvider>
  );
}
