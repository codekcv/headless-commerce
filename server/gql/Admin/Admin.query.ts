import { list, queryField } from 'nexus';

import { ADMIN } from './Admin.object';

export const ADMIN_GET = queryField('adminGet', {
  type: ADMIN,
  resolve: async (_, __, ctx) => ctx.prisma.admin.findFirst(),
});

export const ADMIN_GET_MANY = queryField('adminGetMany', {
  type: list(ADMIN),
  resolve: async (_, __, ctx) => ctx.prisma.admin.findMany(),
});
