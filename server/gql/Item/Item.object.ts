import { objectType } from 'nexus';

export const ObjectType = objectType({
  name: 'Item',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('description');
    t.float('price');
  },
});
