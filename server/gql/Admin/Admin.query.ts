import { list, queryField } from 'nexus';

export const ADMIN_GET = queryField('adminGet', {
  type: 'Admin',
  resolve: async (_, __, ctx) => ctx.prisma.admin.findFirst(),
});

export const ADMIN_GET_MANY = queryField('adminGetMany', {
  type: list('Admin'),
  resolve: async (_, __, ctx) => ctx.prisma.admin.findMany(),
});
