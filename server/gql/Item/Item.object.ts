import { objectType } from 'nexus';

export const ITEM = objectType({
  name: 'Item',
  definition: (t) => {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.float('price');
  },
});
