import SessionGuard from '@/components/sessionGuard';
import Providers from '@/utils/providers';
import type { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
  session: never;
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
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          <SessionGuard>
            {children}
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
