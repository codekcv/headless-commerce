import { objectType } from 'nexus';

export const AdminObject = objectType({
  name: 'Admin',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
  },
});
