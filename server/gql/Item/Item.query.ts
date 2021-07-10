import { idArg, list, nonNull, queryField } from 'nexus';

export const ITEM_GET_ONE = queryField('itemGetOne', {
  type: 'Item',
  args: { id: nonNull(idArg()) },
  resolve: async (_root, args, ctx) => {
    const findItem = await ctx.prisma.item.findUnique({
      where: { id: args.id },
    });

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
  resolve: async (_root, _arg, ctx) => ctx.prisma.item.findMany(),
});
