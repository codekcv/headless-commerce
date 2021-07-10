import jwt from 'jsonwebtoken';

import generateAccessToken from '../utils/generateAccessToken';
import { context } from './context';

const refreshToken = async (ctx: Record<string, any>): Promise<void> => {
  const token = ctx.headers.authorization?.split(' ')[1];

  if (!token) {
    ctx.response.status = 400;
    return;
  }

  const admin = await context.prisma.admin.findUnique({
    where: { refreshToken: token },
  });

  if (!admin) {
    ctx.response.status = 403;
    return;
  }

  if (!process.env.REFRESH_TOKEN_SECRET) {
    ctx.response.status = 500;
    return;
  }

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    ctx.body = {
      accessToken: generateAccessToken({ sub: admin.id }),
    };
  } catch (err) {
    ctx.response.status = 401;
  }
};

export default refreshToken;
