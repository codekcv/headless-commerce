import { queryField } from 'nexus';

export const ADMIN_GET = queryField('adminGet', {
  type: 'Admin',
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: async (_root, _args, ctx) => ctx.auth.admin,
});

export const ADMIN_GET_LOGIN_INFO = queryField('adminGetLoginInfo', {
  type: 'AdminLoginInfo',
  resolve: async (_, __, ctx) => {
    const admin = await ctx.db.admin.findMany();

    if (!admin.length) {
      throw new Error('No admin/s found.');
    }

    const info = {
      username: admin[0].username,
      password: admin[0].password,
    };

    return info;
  },
});

export const ADMIN_IS_AUTHORIZED = queryField('adminIsAuthorized', {
  type: 'Boolean',
  resolve: (_, __, ctx) => ctx.auth.ok,
});
