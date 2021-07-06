import { floatArg, mutationField, nonNull, stringArg } from 'nexus';

export const ITEM_CREATE_ONE = mutationField('itemCreateOne', {
  type: 'Item',
  args: {
    name: nonNull(stringArg()),
    description: nonNull(stringArg()),
    price: nonNull(floatArg()),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: async (_root, args, ctx) => ctx.db.item.create({ data: args }),
});
