import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mutationField, nonNull, stringArg } from 'nexus';

import generateAccessToken from '../../utils/generateAccessToken';
import { verifyRefreshToken } from '../../utils/verifyToken';

export const ADMIN_LOGIN = mutationField('adminLogin', {
  type: 'String',
  args: {
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, args, ctx) => {
    const admin = await ctx.prisma.admin.findUnique({
      where: {
        username: args.username,
      },
    });

    if (!admin) {
      throw new Error(`No admin found with username: ${args.username}`);
    }

    const match = await bcrypt.compare(args.password, admin.passwordHash);

    if (!match) {
      throw new Error('Invalid password.');
    }

    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      throw new Error('Internal server error.');
    }

    const accessToken = generateAccessToken({ sub: admin.id });
    let refreshToken = admin?.refreshToken ?? '';

    if (!verifyRefreshToken(refreshToken)) {
      refreshToken = jwt.sign(
        { sub: admin.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );

      await ctx.prisma.admin.update({
        where: { id: admin.id },
        data: { refreshToken },
      });
    }

    const expireDuration = 60 * 60 * 24 * 7; // 7 Days
    const expire = new Date();

    expire.setTime(new Date().getTime() + expireDuration);

    ctx.cookies.set('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      expires: expire,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    ctx.admin = admin;

    return accessToken;
  },
});

export const ADMIN_LOGOUT = mutationField('adminLogout', {
  type: 'String',
  resolve: async (_, __, ctx) => {
    // Clear refreshToken from database and cookie.
    await ctx.prisma.admin.update({
      where: {
        refreshToken: ctx.cookies.get('refreshToken'),
      },
      data: {
        refreshToken: null,
      },
    });

    ctx.cookies.set('refreshToken');

    return `Logged out succesfully.`;
  },
});

// export const ADMIN_UPDATE = mutationField('adminUpdate', {
//   type: 'Admin',
//   args: {
//     firstName: stringArg(),
//     lastName: stringArg(),
//   },
//   resolve: async (_, args, ctx) => {
//     if (!ctx.auth.admin) {
//       throw new Error('No admin found.');
//     }

//     const { id } = ctx.auth.admin;
//     const truthyArgs = getObjTruth(args);
//     const updatedAdmin = { ...ctx.auth.admin, ...truthyArgs };

//     await ctx.prisma.admin.update({
//       where: { id },
//       data: updatedAdmin,
//     });

//     return updatedAdmin;
//   },
// });
