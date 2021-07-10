import bcrypt from 'bcrypt';
import { intArg, mutationField, nonNull, stringArg } from 'nexus';

export const CUSTOMER_CREATE_ONE = mutationField('customerCreateOne', {
  type: 'Customer',
  args: {
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
    email: nonNull(stringArg()),
    firstName: nonNull(stringArg()),
    lastName: nonNull(stringArg()),
    age: intArg(),
  },
  resolve: async (_, args, ctx) => {
    return ctx.prisma.customer.create({
      data: {
        username: args.username,
        passwordHash: await bcrypt.hash(args.password, 10),
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        age: args.age,
      },
    });
  },
});
