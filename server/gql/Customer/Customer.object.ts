import { objectType } from 'nexus';
import { Customer } from 'nexus-prisma';

export const CUSTOMER_OBJECT = objectType({
  name: Customer.$name,
  definition: (t) => {
    t.nonNull.field(Customer.id);
    t.nonNull.field(Customer.username);
    t.nonNull.field(Customer.password);
    t.nonNull.field(Customer.firstName);
    t.nonNull.field(Customer.lastName);
    t.nonNull.field(Customer.age);
    t.nonNull.field(Customer.email);
    t.nonNull.field(Customer.itemsBought);
  },
});
