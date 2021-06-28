import { idArg, list, nonNull, queryField } from 'nexus';

export const ITEM_GET_ONE = queryField('itemGetOne', {
  type: 'Item',
  args: { id: nonNull(idArg()) },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_root, args, ctx) => {
    const findItem = ctx.db.items.find((item) => item.id === args.id);

    if (!findItem) {
      throw Error(`Custom with id ${args.id} does not exist.`);
    }

    return findItem;
  },
});

export const ITEM_GET_MANY = queryField('itemGetMany', {
  type: list('Item'),
  args: {
    filter: idArg(),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_root, _arg, ctx) => ctx.db.items,
});
