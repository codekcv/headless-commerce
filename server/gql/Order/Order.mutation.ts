// import faker from 'faker';
// import { nanoid } from 'nanoid';
// import { idArg, mutationField, nonNull } from 'nexus';

// export const ORDER_UPSERT_ONE = mutationField('orderUpsertOne', {
//   type: 'Order',
//   args: {
//     customerId: nonNull(idArg()),
//   },
//   resolve: async (_, args, ctx) => {
//     const id = nanoid();

//     const order = await ctx.prisma.order.upsert({
//       where: { id },
//       create: {
//         id: nanoid(),
//         reference: nanoid(8).toUpperCase(),
//         address: `${faker.address.zipCode()} ${faker.address.cityName()} ${faker.address.streetName()}`,
//         status: 'ORDERED',
//         total: 42,
//         orderDate: new Date(faker.datatype.datetime().toISOString()),
//         customerId: args.customerId,
//       },
//       update: {},
//     });

//     return order;
//   },
// });
