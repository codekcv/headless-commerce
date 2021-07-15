// import { arg, floatArg, mutationField, nonNull, stringArg } from 'nexus';

// export const ITEM_CREATE_ONE = mutationField('itemCreateOne', {
//   type: 'Item',
//   args: {
//     name: nonNull(arg({ type: 'ItemView' })),
//     description: nonNull(stringArg()),
//     price: nonNull(floatArg()),
//   },
//   resolve: async (_root, args, ctx) => ctx.prisma.item.create({ data: args }),
// });
