import { idArg, list, nonNull, queryField } from 'nexus';

import { ADMIN } from './Admin.object';

export const ADMIN_ME = queryField('adminMe', {
  type: ADMIN,
  resolve: (_, __, ctx) => {
    const [admin] = ctx.me;

    if (!admin) {
      throw new Error('No admin found.');
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
