import { idArg, list, nonNull, queryField } from 'nexus';

export const CUSTOMER_GET_ONE = queryField('customerGetOne', {
  type: 'Customer',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_root, args, ctx) => {
    const findCustomer = await ctx.db.customer.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!findCustomer) {
      throw Error(`Custom with id ${args.id} does not exist.`);
    }

    return findCustomer;
  },
});

export const CUSTOMER_GET_MANY = queryField('customerGetMany', {
  type: list('Customer'),
  args: {
    filter: idArg(),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: async (_root, _arg, ctx) => ctx.db.customer.findMany(),
});
