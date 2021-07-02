import { enumType, objectType } from 'nexus';

export const ORDER = objectType({
  name: 'Order',
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('reference');
    t.nonNull.field('customer', { type: 'Customer' });
    t.nonNull.string('address');
    t.nonNull.list.field('items', { type: 'Item' });
    t.nonNull.float('total');
    t.nonNull.string('orderDate');
    t.nonNull.field('status', { type: 'OrderStatus' });
  },
});

export const ORDER_STATUS = enumType({
  name: 'OrderStatus',
  members: ['ORDERED', 'DELIVERED', 'CANCALLED'],
  description: 'The status of the order.',
});
