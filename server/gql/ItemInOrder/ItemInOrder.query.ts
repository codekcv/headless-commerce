// import { idArg, list, nonNull, queryField } from 'nexus';

// export const ITEM_GET_ONE = queryField('itemGetOne', {
//   type: 'ItemInOrder',
//   args: { id: nonNull(idArg()) },
//   resolve: async (_, args, ctx) => {
//     const findItem = await ctx.prisma.itemInOrder.findUnique({
//       where: { id: args.id },
//     });

//     if (!findItem) {
//       throw Error(`Custom with id ${args.id} does not exist.`);
//     }

//     return findItem;
//   },
// });

// export const ITEM_GET_MANY = queryField('itemGetMany', {
//   type: list('ItemInOrder'),
//   args: {
//     filter: idArg(),
//   },
//   resolve: async (_, __, ctx) => ctx.prisma.item.findMany(),
// });
