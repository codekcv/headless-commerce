import { objectType } from 'nexus';
import { Item } from 'nexus-prisma';

export const ITEM = objectType({
  name: Item.$name,
  definition: (t) => {
    t.nonNull.field(Item.id);
    t.nonNull.field(Item.name);
    t.nonNull.field(Item.description);
    t.nonNull.field(Item.price);
  },
});
