import { intArg, mutationField, nonNull, stringArg } from 'nexus';

export const CUSTOMER_CREATE_ONE = mutationField('customerCreateOne', {
  type: 'Customer',
  args: {
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
    firstName: nonNull(stringArg()),
    lastName: nonNull(stringArg()),
    email: nonNull(stringArg()),
    age: nonNull(intArg()),
  },
  authorize: (_, __, ctx) => ctx.auth.ok,
  resolve: async (_root, args, ctx) => {
    try {
      return ctx.prisma.customer.create({ data: args });
    } catch (error) {
      throw new Error(error);
    }
  },
});
