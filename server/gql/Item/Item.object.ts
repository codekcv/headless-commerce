import { objectType } from 'nexus';
import { Item } from 'nexus-prisma';

export const ITEM = objectType({
  name: Item.$name,
  definition: (t) => {
    t.field(Item.id);
    t.field(Item.reference);
    t.field(Item.order);
    t.field(Item.quantity);
    t.field(Item.total);
  },
});
