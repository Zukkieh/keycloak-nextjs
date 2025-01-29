import { Claims } from '@/@types/jwt-claims';
import axios, { AxiosError } from 'axios';
import { AuthOptions, TokenSet } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { emptyJwt } from './auth';

const keycloak = KeycloakProvider({
  clientId: process.env.NEXTAUTH_KEYCLOAK_CLIENT_ID!,
  clientSecret: process.env.NEXTAUTH_KEYCLOAK_CLIENT_SECRET!,
  issuer: process.env.NEXTAUTH_KEYCLOAK_ISSUER!,
});

function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${process.env.NEXTAUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.NEXTAUTH_KEYCLOAK_CLIENT_ID,
      client_secret: process.env.NEXTAUTH_KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
    }),
    method: "POST",
    cache: "no-store"
  });
}

async function doFinalSignoutHandshake(jwt: JWT) {
  const { provider, id_token } = jwt;
  if (provider == keycloak.id) {
    try {
      const params = new URLSearchParams();
      params.append('id_token_hint', id_token);
      await axios.get(
        `${process.env.NEXTAUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`,
      );
    } catch (e) {
      console.error(
        'Unable to perform post-logout handshake',
        (e as AxiosError)?.code || e,
      );
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [keycloak],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 30
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: undefined,
  },
  events: {
    signOut: ({ token }) => doFinalSignoutHandshake(token),
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/inicio`;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const tokenClaims: Claims = JSON.parse(
          Buffer.from(account.access_token?.split('.')[1], 'base64').toString(),
        );
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpired = account.expires_at!;
        token.refreshTokenExpired = account.refresh_expires_in;
        token.user = user;
        token.user.roles =
          tokenClaims.resource_access?.['keycloak-next-cli']?.roles;
        token.id_token = account.id_token;
        return token;
      }
      if (Date.now() < (token.accessTokenExpired! * 1000 - 60 * 1000)) {
        return token
      } else {
        try {
          if(!token.accessToken){
            throw { error: 'invalid_grant', error_description: 'Invalid access token' }
          }
          const response = await requestRefreshOfAccessToken(token)

          const tokens: TokenSet = await response.json()
          if (!response.ok) throw tokens

          const updatedToken: JWT = {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token!,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          }
          return updatedToken
        } catch (error) {
          console.error("Error refreshing access token", error)
          doFinalSignoutHandshake(token);
          return { ...emptyJwt, error: "RefreshAccessTokenError" }
        }
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.id_token = token.id_token;
      }
      return session;
    },
  },
};
