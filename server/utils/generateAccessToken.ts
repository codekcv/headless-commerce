import jwt from 'jsonwebtoken';

const generateAccessToken = (user: Record<string, any>): string => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(`Internal server error: !tokenSecret`);
  }

  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export default generateAccessToken;
