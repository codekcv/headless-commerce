import { objectType } from 'nexus';
import { Item } from 'nexus-prisma';

export const ITEM = objectType({
  name: Item.$name,
  definition: (t) => {
    t.field(Item.id);
    t.field(Item.name);
    t.field(Item.description);
    t.field(Item.price);
    t.field(Item.itemInOrders);
  },
});
