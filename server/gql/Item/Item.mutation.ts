import { nanoid } from 'nanoid';
import { floatArg, mutationField, nonNull, stringArg } from 'nexus';

import { NexusGenObjects } from '../../nexus-typegen';

export const ITEM_CREATE_ONE = mutationField('itemCreateOne', {
  type: 'Item',
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    price: nonNull(floatArg()),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_root, args, ctx) => {
    const newItem: NexusGenObjects['Item'] = {
      id: nanoid(),
      ...args,
    };

    ctx.db.items.push(newItem);

    return newItem;
  },
});
