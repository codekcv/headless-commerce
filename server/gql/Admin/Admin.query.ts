import { JwtPayload } from 'jsonwebtoken';
import { idArg, list, nonNull, queryField } from 'nexus';

import { getRefreshToken } from '../../utils/verifyToken';
import { ADMIN } from './Admin.object';

export const ADMIN_ME = queryField('adminMe', {
  type: ADMIN,
  resolve: async (_, __, ctx) => {
    const refreshToken = ctx.cookies.get('refreshToken');

    if (!refreshToken) {
      throw new Error('No token.');
    }

    const { sub: adminId } = getRefreshToken(refreshToken) as JwtPayload;

    const admin = await ctx.prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin) {
      throw new Error('INTERNAL SERVER ERROR');
    }

    return admin;
  },
});

export const ADMIN_GET = queryField('adminGet', {
  type: ADMIN,
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, args, ctx) => {
    const admin = await ctx.prisma.admin.findUnique({
      where: {
        id: args.id,
      },
    });

    return admin;
  },
});

export const ADMIN_GET_MANY = queryField('adminGetMany', {
  type: list(ADMIN),
  resolve: async (_, __, ctx) => ctx.prisma.admin.findMany(),
});
