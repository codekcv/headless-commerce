import { mutationField, nonNull, stringArg } from 'nexus';

import getObjTruth from '../../utils/getObjValid';

export const ADMIN_LOGIN = mutationField('adminLogin', {
  type: 'String',
  args: {
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_root, args, ctx) => {
    const admin = await ctx.db.admin.findUnique({
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
    ctx.auth.ok = false;
    return `${ctx.auth.admin?.username} logged out!`;
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
    const admin = await ctx.db.admin.findUnique({
      where: {
        email: 'mail@mail.mail',
      },
    });

    if (!admin) {
      throw new Error('No admin found.');
    }

    const truthyArgs = getObjTruth(args);
    const updatedAdmin = { ...admin, ...truthyArgs };

    await ctx.db.admin.update({
      where: {
        email: 'mail@mail.mail',
      },
      data: updatedAdmin,
    });

    return updatedAdmin;
  },
});
