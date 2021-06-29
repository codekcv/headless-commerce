import { mutationField, nonNull, stringArg } from 'nexus';

import getObjTruth from '../../utils/getObjValid';

export const ADMIN_LOGIN = mutationField('adminLogin', {
  type: 'String',
  args: {
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: (_root, args, ctx) => {
    const { admin } = ctx.db;
    const isMatchUsername = admin.username === args.username;
    const isMatchPassword = admin.password === args.password;

    if (isMatchUsername && isMatchPassword) {
      ctx.auth.ok = true;
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
    return `Logged out ${ctx.db.admin.username}!`;
  },
});

export const ADMIN_UPDATE = mutationField('adminUpdate', {
  type: 'Admin',
  args: {
    firstName: stringArg(),
    lastName: stringArg(),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_, args, ctx) => {
    const { admin } = ctx.db;
    const truthyArgs = getObjTruth(args);
    const updatedAdmin = { ...admin, ...truthyArgs };

    ctx.db.admin = updatedAdmin;

    return updatedAdmin;
  },
});
