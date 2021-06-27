import { floatArg, mutationField, nonNull, stringArg } from 'nexus';

import { NexusGenObjects } from '../../nexus-typegen';

let currentId = 0;

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
      id: `item-${(currentId += 1)}`,
      ...args,
    };

    ctx.db.items.push(newItem);

    return newItem;
  },
});
