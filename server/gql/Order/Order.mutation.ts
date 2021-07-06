import faker from 'faker';
import { nanoid } from 'nanoid';
import { idArg, mutationField, nonNull } from 'nexus';
import { Order } from 'nexus-prisma';

export const ORDER_UPSERT_ONE = mutationField('orderUpsertOne', {
  type: Order.$name,
  args: {
    customerId: nonNull(idArg()),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: async (_root, args, ctx) => {
    const id = nanoid();

    const order = await ctx.prisma.order.upsert({
      where: { id },
      create: {
        id: nanoid(),
        reference: nanoid(8).toUpperCase(),
        address: `${faker.address.zipCode()} ${faker.address.cityName()} ${faker.address.streetName()}`,
        status: 'ORDERED',
        total: 42,
        orderDate: new Date(faker.datatype.datetime().toISOString()),
        customerId: args.customerId,
      },
      update: {},
    });

    return order;
  },
});
