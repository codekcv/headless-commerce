import { enumType, objectType } from 'nexus';
import { Order } from 'nexus-prisma';

export const ORDER = objectType({
  name: Order.$name,
  definition: (t) => {
    t.field(Order.id);
    t.field(Order.reference);
    t.field(Order.customer);
    t.field(Order.address);
    t.field(Order.items);
    t.field(Order.total);
    t.field(Order.orderDate);
    t.field(Order.status);
  },
});

export const ORDER_STATUS = enumType({
  name: 'OrderStatus',
  members: ['ORDERED', 'DELIVERED', 'CANCELLED'],
  description: 'The status of the order.',
});
