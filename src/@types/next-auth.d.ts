import { Group } from '@/utils/constants';
declare module 'next-auth' {
  interface User {
    sub: string;
    email_verified: boolean;
    name: string;
    org_name: string;
    email: string;
    id: string;
    group?: Group;
    roles?: string[];
  }

  interface Session {
    accessToken: string;
    refreshToken: string;
    id_token: string;
    user: User;
    error: string;
  }

  interface Account {
    provider: string;
    providerAccountId: string;
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: string;
    'not-before-policy': number;
    session_state: string;
    scope: string;
  }
}

import type { User } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id_token: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpired: number;
    refreshTokenExpired: number;
    user: User;
    error: string;
  }
}
