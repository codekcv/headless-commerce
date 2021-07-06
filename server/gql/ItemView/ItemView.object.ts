import { objectType } from 'nexus';
import { ItemView } from 'nexus-prisma';

export const ITEM_VIEW = objectType({
  name: ItemView.$name,
  definition: (t) => {
    t.nonNull.field(ItemView.id);
    t.nonNull.field(ItemView.name);
    t.nonNull.field(ItemView.description);
    t.nonNull.field(ItemView.price);
    t.nonNull.field(ItemView.item);
  },
});
