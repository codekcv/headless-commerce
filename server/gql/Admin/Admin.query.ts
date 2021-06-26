import { queryField } from 'nexus';

export const AdminQuery = queryField('getAdmin', {
  type: 'Admin',
  resolve: (_root, _args, ctx) => ctx.db.admin,
});
