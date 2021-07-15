import jwt from 'jsonwebtoken';
import { queryField } from 'nexus';

import generateAccessToken from '../utils/generateAccessToken';

export * from './Admin';
export * from './Customer';
export * from './Item';
export * from './ItemInOrder';
export * from './Order';
export * from './Scalar';

export const HELLO_WORLD = queryField('helloWorld', {
  type: 'String',
  resolve: () => 'Hello World',
});

export const GET_NEW_ACCESS_TOKEN = queryField('getNewAccessToken', {
  type: 'String',
  resolve: async (_, __, ctx) => {
    const refreshToken = ctx.cookies.get('refreshToken');

    if (!refreshToken) {
      throw new Error('No token.');
    }

    const admin = await ctx.prisma.admin.findUnique({
      where: { refreshToken },
    });

    if (!admin) {
      throw new Error('Invalid.');
    }

    if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new Error('Internal Server Error: REFRESH_TOKEN_SECRET');
    }

    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      return generateAccessToken({ sub: admin.id });
    } catch (err) {
      throw new Error('Token is invalid/expired.');
    }
  },
});
