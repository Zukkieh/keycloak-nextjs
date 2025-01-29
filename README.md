This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the docker compose file:

```bash
cd docker
docker compose up
````

Open [http://localhost:8080](http://localhost:8080) with your browser to see the Keycloak running.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run properly the app, create a .env.local file and add:

```bash
NEXTAUTH_KEYCLOAK_CLIENT_ID="<KEYCLOAK_CLIENT_ID>"
NEXTAUTH_KEYCLOAK_CLIENT_SECRET="<KEYCLOAK_CLIENT_SECRET>"
NEXTAUTH_KEYCLOAK_ISSUER="http://localhost:8080/realms/<KEYCLOAK_REALM_NAME>"
NEXTAUTH_BASE_URL="http://localhost:3000"
NEXTAUTH_SECRET="<AUTH_SECRET>" //you can use 'openssl rand -base64 32' to generate it
```