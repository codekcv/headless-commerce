import { mutationField, nonNull, stringArg } from 'nexus';

import getObjTruth from '../../utils/getObjValid';

export const ADMIN_LOGIN = mutationField('adminLogin', {
  type: 'String',
  args: {
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_root, args, ctx) => {
    const admin = await ctx.prisma.admin.findUnique({
      where: {
        username: args.username,
      },
    });

    const isMatchPassword = admin?.password === args.password;

    if (admin && isMatchPassword) {
      ctx.auth.ok = true;
      ctx.auth.admin = admin;
    } else {
      throw new Error('Invalid username or password.');
    }

    return `Welcome ${admin.username}!`;
  },
});

export const ADMIN_LOGOUT = mutationField('adminLogout', {
  type: 'String',
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_, __, ctx) => {
    const username = ctx.auth.admin?.username;

    ctx.auth.ok = false;
    ctx.auth.admin = null;

    return `${username} logged out!`;
  },
});

export const ADMIN_UPDATE = mutationField('adminUpdate', {
  type: 'Admin',
  args: {
    firstName: stringArg(),
    lastName: stringArg(),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: async (_, args, ctx) => {
    if (!ctx.auth.admin) {
      throw new Error('No admin found.');
    }

    const { id } = ctx.auth.admin;
    const truthyArgs = getObjTruth(args);
    const updatedAdmin = { ...ctx.auth.admin, ...truthyArgs };

    await ctx.prisma.admin.update({
      where: { id },
      data: updatedAdmin,
    });

    return updatedAdmin;
  },
});
