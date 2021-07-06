/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import faker from 'faker';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
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
    // const itemViews: ItemView[] = [];

    // for (let i = 0; i < 10; i += 1) {
    //   const id = nanoid();

    //   const item = await prisma.itemView.upsert({
    //     where: { id },
    //     create: {
    //       id,
    //       name: faker.commerce.productName(),
    //       description: faker.commerce.productDescription(),
    //       price: parseFloat(faker.commerce.price()),
    //     },
    //     update: {},
    //   });

    //   itemViews.push(item);
    // }

    // Customers
    const customers = [];

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

    // Items

    // const getId = (): string => {
    //   return itemViews[Math.floor(Math.random() * items.length)].id;
    // };

    // Orders
    for (let i = 0; i < 2; i += 1) {
      const id = nanoid();

      await prisma.order.upsert({
        where: { id },
        create: {
          id: nanoid(),
          reference: nanoid(8).toUpperCase(),
          address: `${faker.address.zipCode()} ${faker.address.cityName()} ${faker.address.streetName()}`,
          status: 'ORDERED',
          total: 42,
          orderDate: new Date(faker.datatype.datetime().toISOString()),
          itemList: {
            createMany: {
              data: (() => {
                const items = [];

                for (let j = 0; j < 4; j += 1) {
                  const item = {
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: parseFloat(faker.commerce.price()),
                  };

                  items.push(item);
                }

                console.log('I:', items);

                return items;
              })(),
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
