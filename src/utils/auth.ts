import type { JWT } from 'next-auth/jwt';
import { getServerSession, type User } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './authOptions';

const emptyUser: User = {
  sub: '',
  email_verified: false,
  name: '',
  org_name: '',
  email: '',
  id: '',
};

export const emptyJwt: JWT = {
  id_token: '',
  accessToken: '',
  refreshToken: '',
  accessTokenExpired: 0,
  refreshTokenExpired: 0,
  user: emptyUser,
  error: '',
};

export const getServerAuthSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  return await getServerSession(req, res, authOptions);
};
