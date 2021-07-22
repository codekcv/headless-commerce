import jwt, { JwtPayload } from 'jsonwebtoken';

export const getAccessToken = (
  token: string
): JwtPayload | string | undefined => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('Internal Server Error: ACCESS_TOKEN_SECRET');
  }

  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    return undefined;
  }
};

export const getRefreshToken = (
  token: string
): JwtPayload | string | undefined => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('Internal Server Error: REFRESH_TOKEN_SECRET');
  }

  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    return undefined;
  }
};
