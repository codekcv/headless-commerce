import { objectType } from 'nexus';
import { ItemView } from 'nexus-prisma';

export const ITEM_VIEW = objectType({
  name: ItemView.$name,
  definition: (t) => {
    t.field(ItemView.id);
    t.field(ItemView.name);
    t.field(ItemView.description);
    t.field(ItemView.price);
    t.field(ItemView.item);
  },
});
