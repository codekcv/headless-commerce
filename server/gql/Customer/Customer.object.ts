import { objectType } from 'nexus';
import { Customer } from 'nexus-prisma';

export const CUSTOMER = objectType({
  name: Customer.$name,
  definition: (t) => {
    t.field(Customer.id);
    t.field(Customer.username);
    t.field(Customer.passwordHash);
    t.field(Customer.firstName);
    t.field(Customer.lastName);
    t.field(Customer.age);
    t.field(Customer.email);
    t.field(Customer.orders);
  },
});
