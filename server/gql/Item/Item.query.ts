import { list, queryField } from 'nexus';

import { ITEM } from './Item.object';

export const ITEM_GET_MANY = queryField('itemGetMany', {
  type: list(ITEM),
  resolve: async (_, __, ctx) => ctx.prisma.item.findMany(),
});
