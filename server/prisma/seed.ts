/* eslint-disable no-await-in-loop */
import { Customer, Item, ItemView, PrismaClient } from '@prisma/client';
import faker from 'faker';
import { nanoid } from 'nanoid';

const main = async (): Promise<void> => {
  const prisma = new PrismaClient();

  try {
    // Admin
    await prisma.admin.upsert({
      where: {
        email: 'lorem@ipsum.com',
      },
      create: {
        email: 'lorem@ipsum.com',
        firstName: 'Lorem',
        lastName: 'Ipsum',
        username: 'demo1user',
        password: 'demo1pass',
      },
      update: {},
    });

    // Item Views
    const itemViews: ItemView[] = [];

    for (let i = 0; i < 10; i += 1) {
      const id = nanoid();

      const item = await prisma.itemView.upsert({
        where: { id },
        create: {
          id,
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
        },
        update: {},
      });

      itemViews.push(item);
    }

    // Customers
    const customers: Customer[] = [];

    for (let i = 0; i < 1; i += 1) {
      const id = nanoid();

      const customer = await prisma.customer.upsert({
        where: { id },
        create: {
          id,
          username: faker.internet.userName(),
          password: faker.internet.password(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          age: Math.floor(Math.random() * (60 - 10) + 10),
        },
        update: {},
      });

      customers.push(customer);
    }

    // Orders
    for (let i = 0; i < 2; i += 1) {
      const id = nanoid();
      const manyItems: Omit<Item, 'orderId'>[] = [];
      let orderTotal = 0;

      for (let j = 0; j < 5; j += 1) {
        const item = itemViews[Math.floor(Math.random() * itemViews.length)];
        const quantity = Math.floor(Math.random() * 5) + 1;
        const total = quantity * item.price;

        orderTotal += total;

        manyItems.push({
          id: nanoid(),
          itemViewId: item.id,
          quantity,
          total,
        });
      }

      await prisma.order.upsert({
        where: { id },
        create: {
          id,
          reference: nanoid(8).toUpperCase(),
          address: `${faker.address.zipCode()} ${faker.address.cityName()} ${faker.address.streetName()}`,
          status: 'ORDERED',
          total: orderTotal,
          orderDate: new Date(faker.datatype.datetime().toISOString()),
          items: {
            createMany: {
              data: manyItems,
            },
          },
          customer: {
            connect: {
              id: customers[0].id,
            },
          },
        },
        update: {},
      });
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    prisma.$disconnect();
  }
};

main();
