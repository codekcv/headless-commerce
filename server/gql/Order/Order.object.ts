import { enumType, objectType } from 'nexus';
import { Order, OrderStatus } from 'nexus-prisma';

export const ORDER = objectType({
  name: Order.$name,
  definition: (t) => {
    t.field(Order.id);
    t.field(Order.referenceId);
    t.field(Order.customer);
    t.field(Order.address);
    t.field(Order.itemsInOrder);
    t.field(Order.total);
    t.field(Order.orderDate);
    t.field(Order.status);
  },
});

export const ORDER_STATUS = enumType(OrderStatus);
