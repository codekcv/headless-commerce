import { mutationField, nonNull, stringArg } from 'nexus';

let customer = 0;

export const CUSTOMER_CREATE_ONE = mutationField('customerCreateOne', {
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
    const newCustomer = {
      id: `customer-${(customer += 1)}`,
      ...args,
      itemsBought: [],
    };

    ctx.db.customers.push(newCustomer);

    return newCustomer;
  },
});
