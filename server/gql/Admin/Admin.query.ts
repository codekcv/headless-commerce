import { queryField } from 'nexus';

export const ADMIN_GET = queryField('adminGet', {
  type: 'Admin',
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_root, _args, ctx) => ctx.db.admin,
});
