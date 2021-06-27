import { intArg, list, nonNull, queryField, stringArg } from 'nexus';

export const CUSTOMER_GET_ONE = queryField('customerGetOne', {
  type: 'Customer',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_root, args, ctx) => {
    const findCustomer = ctx.db.customers.find(
      (customer) => customer.id === args.id
    );

    if (!findCustomer) {
      throw Error(`Custom with id ${args.id} does not exist.`);
    }

    return findCustomer;
  },
});

export const CUSTOMER_GET_MANY = queryField('customerGetMany', {
  type: list('Customer'),
  args: {
    filter: stringArg(),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_root, _arg, ctx) => ctx.db.customers,
});
