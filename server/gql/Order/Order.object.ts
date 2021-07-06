import { enumType, objectType } from 'nexus';
import { Order } from 'nexus-prisma';

export const ORDER = objectType({
  name: Order.$name,
  definition: (t) => {
    t.nonNull.field(Order.id);
    t.nonNull.field(Order.reference);
    t.nonNull.field(Order.customer);
    t.nonNull.field(Order.address);
    t.nonNull.field(Order.items);
    t.nonNull.field(Order.total);
    t.nonNull.field(Order.orderDate);
    t.nonNull.field(Order.status);
  },
});

export const ORDER_STATUS = enumType({
  name: 'OrderStatus',
  members: ['ORDERED', 'DELIVERED', 'CANCELLED'],
  description: 'The status of the order.',
});
