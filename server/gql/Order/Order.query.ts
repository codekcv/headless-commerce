// import { idArg, list, nonNull, queryField } from 'nexus';

// export const ORDER_GET_ONE = queryField('orderGetOne', {
//   type: 'Order',
//   args: { id: nonNull(idArg()) },
//   resolve: async (_, args, ctx) => {
//     const findOrder = await ctx.prisma.order.findUnique({
//       where: { id: args.id },
//     });

//     if (!findOrder) {
//       throw Error(`Custom with id ${args.id} does not exist.`);
//     }

//     return findOrder;
//   },
// });

// export const ORDER_GET_MANY = queryField('orderGetMany', {
//   type: list('Order'),
//   args: {
//     filter: idArg(),
//   },
//   resolve: async (_, __, ctx) => ctx.prisma.order.findMany(),
// });
