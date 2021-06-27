import { objectType } from 'nexus';

export const ADMIN = objectType({
  name: 'Admin',
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('username');
    t.nonNull.string('password');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
  },
});

export const ADMIN_LOGIN_INFO = objectType({
  name: 'AdminLoginInfo',
  definition: (t) => {
    t.nonNull.string('username');
    t.nonNull.string('password');
  },
});
