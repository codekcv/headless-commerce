import { objectType } from 'nexus';

export const ITEM = objectType({
  name: 'Item',
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.float('price');
  },
});
