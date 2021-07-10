import jwt from 'jsonwebtoken';

export const verifyAccessToken = (token: string): boolean => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('Internal Server Error: ACCESS_TOKEN_SECRET');
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    return false;
  }

  return true;
};

export const verifyRefreshToken = (token: string): boolean => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('Internal Server Error: REFRESH_TOKEN_SECRET');
  }

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    return false;
  }

  return true;
};
