import { idArg, list, nonNull, queryField } from 'nexus';

export const ORDER_GET_ONE = queryField('orderGetOne', {
  type: 'Order',
  args: { id: nonNull(idArg()) },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: async (_root, args, ctx) => {
    const findOrder = await ctx.db.order.findUnique({ where: { id: args.id } });

    if (!findOrder) {
      throw Error(`Custom with id ${args.id} does not exist.`);
    }

    return findOrder;
  },
});

export const ORDER_GET_MANY = queryField('orderGetMany', {
  type: list('Order'),
  args: {
    filter: idArg(),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: async (_root, _arg, ctx) => ctx.db.order.findMany(),
});
