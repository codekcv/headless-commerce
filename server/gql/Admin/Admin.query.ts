import { queryField } from 'nexus';

import { NexusGenObjects } from '../../nexus-typegen';

export const ADMIN_GET = queryField('adminGet', {
  type: 'Admin',
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_root, _args, ctx) => ctx.db.admin,
});

export const ADMIN_GET_LOGIN_INFO = queryField('adminGetLoginInfo', {
  type: 'AdminLoginInfo',
  resolve: (_, __, ctx) => {
    const info: NexusGenObjects['AdminLoginInfo'] = {
      username: ctx.db.admin.username,
      password: ctx.db.admin.password,
    };

    return info;
  },
});
