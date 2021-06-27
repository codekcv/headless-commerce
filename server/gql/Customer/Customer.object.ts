import { objectType } from 'nexus';

export const CUSTOMER_OBJECT = objectType({
  name: 'Customer',
  definition: (t) => {
    t.nonNull.int('id');
    t.nonNull.string('username');
    t.nonNull.string('password');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
    t.nonNull.list.field('itemsBought', { type: 'Item' });
  },
});
