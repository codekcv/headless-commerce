import { mutationField, nonNull, stringArg } from 'nexus';

export const ITEM_CREATE_ONE = mutationField('customerCreateOne', {
  type: 'Customer',
  args: {
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
    firstName: nonNull(stringArg()),
    lastName: nonNull(stringArg()),
    email: nonNull(stringArg()),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: (_root, args, ctx) => {
    const newCustomer = { id: 12, ...args, itemsBought: [] };

    ctx.db.customers.push(newCustomer);

    return newCustomer;
  },
});
