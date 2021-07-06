import { objectType } from 'nexus';
import { Admin } from 'nexus-prisma';

export const ADMIN = objectType({
  name: Admin.$name,
  definition: (t) => {
    t.nonNull.field(Admin.id);
    t.nonNull.field(Admin.username);
    t.nonNull.field(Admin.password);
    t.nonNull.field(Admin.firstName);
    t.nonNull.field(Admin.lastName);
    t.nonNull.field(Admin.email);
  },
});

export const ADMIN_LOGIN_INFO = objectType({
  name: 'AdminLoginInfo',
  definition: (t) => {
    t.nonNull.string('username');
    t.nonNull.string('password');
  },
});
