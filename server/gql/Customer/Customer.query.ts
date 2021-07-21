import { idArg, list, nonNull, queryField } from 'nexus';

import { CUSTOMER } from './Customer.object';

export const CUSTOMER_GET_ONE = queryField('customerGetOne', {
  type: CUSTOMER,
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, args, ctx) => {
    const customer = await ctx.prisma.customer.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!customer) {
      throw Error(`Custom with id ${args.id} does not exist.`);
    }

    return customer;
  },
});

export const CUSTOMER_GET_MANY = queryField('customerGetMany', {
  type: list('Customer'),
  args: {
    filter: idArg(),
  },
  resolve: async (_, __, ctx) => ctx.prisma.customer.findMany(),
});
