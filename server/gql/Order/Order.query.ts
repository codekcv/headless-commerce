import { idArg, list, nonNull, queryField } from 'nexus';

export const ORDER_GET_ONE = queryField('orderGetOne', {
  type: 'Order',
  args: { id: nonNull(idArg()) },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_root, args, ctx) => {
    const findOrder = ctx.db.orders.find((order) => order.id === args.id);

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
  resolve: (_root, _arg, ctx) => {
    let { orders } = ctx.db;

    orders = orders.map((order) => {
      return {
        ...order,
        total: order.items.reduce((acc, cur) => acc + (cur?.price ?? 0), 0),
      };
    });

    return orders;
  },
});
