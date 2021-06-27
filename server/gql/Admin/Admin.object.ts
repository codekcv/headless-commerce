import { objectType } from 'nexus';

export const ADMIN = objectType({
  name: 'Admin',
  definition: (t) => {
    t.nonNull.int('id');
    t.nonNull.string('username');
    t.nonNull.string('password');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
  },
});
