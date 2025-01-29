declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_KEYCLOAK_CLIENT_ID: string;
    NEXTAUTH_KEYCLOAK_CLIENT_SECRET: string;
    NEXTAUTH_KEYCLOAK_ISSUER: string;
    NEXTAUTH_ULR: string;
    NEXTAUTH_BASE_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_API_BASE_URL: string;
    NEXT_PUBLIC_API_BFF_BASE_URL: string;
  }
}
