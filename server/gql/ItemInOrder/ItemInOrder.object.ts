import { objectType } from 'nexus';
import { ItemInOrder } from 'nexus-prisma';

export const ITEM_IN_ORDER = objectType({
  name: ItemInOrder.$name,
  definition: (t) => {
    t.field(ItemInOrder.id);
    t.field(ItemInOrder.itemView);
    t.field(ItemInOrder.order);
    t.field(ItemInOrder.quantity);
    t.field(ItemInOrder.total);
  },
});
