import { list, queryField } from 'nexus';

export const ADMIN_GET = queryField('adminGet', {
  type: 'Admin',
  resolve: async (_, __, ctx) => ctx.auth.admin,
});

export const ADMIN_GET_MANY = queryField('adminGetMany', {
  type: list('Admin'),
  resolve: async (_, __, ctx) => {
    const admins = await ctx.prisma.admin.findMany();

    if (!admins.length) {
      throw new Error();
    }

    return admins;
  },
});
