import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

interface IKeycloakRefreshTokenParams {
  body: {
    refreshToken: string;
  };
}

interface IKeycloakRefreshTokenApiResponse {
  id_token: string;
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  session_state: string;
  scope: string;
  'not-before-policy': number;
}

export async function POST(request: Request) {
  try {
    console.log({request})
    const keycloakUrlToRefreshToken = `${process.env.NEXTAUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    const keycloakParamsToRefreshToken = new URLSearchParams();
    const keycloakRefreshTokenBody =
      (await request.json()) as IKeycloakRefreshTokenParams['body'];

    keycloakParamsToRefreshToken.append(
      'client_id',
      process.env.NEXTAUTH_KEYCLOAK_CLIENT_ID!,
    );
    keycloakParamsToRefreshToken.append(
      'client_secret',
      process.env.NEXTAUTH_KEYCLOAK_CLIENT_SECRET!,
    );
    keycloakParamsToRefreshToken.append(
      'grant_type',
      ['refresh_token'].toString(),
    );
    keycloakParamsToRefreshToken.append(
      'refresh_token',
      keycloakRefreshTokenBody.refreshToken,
    );

    const keycloakRefreshTokenResponse = await axios.post(
      keycloakUrlToRefreshToken,
      keycloakParamsToRefreshToken,
    );

    console.log({keycloakRefreshTokenResponse})

    return NextResponse.json(keycloakRefreshTokenResponse.data, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data || {}, {
        status: error.response?.status || 500,
      });
    }

    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

export { type IKeycloakRefreshTokenApiResponse };

