/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '@prisma/client';
import faker from 'faker';
import { nanoid } from 'nanoid';

const customers: any[] = [];
const items: any[] = [];
const orders: any[] = [];

for (let i = 0; i < 10; i += 1) {
  const customer = {
    id: '-',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.floor(Math.random() * (60 - 10) + 10),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    itemsBought: [],
  };

  customers.push(customer);
}

for (let i = 0; i < 10; i += 1) {
  const item = {
    id: '-',
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
  };

  items.push(item);
}

const getRandomItems = () => {
  const randomItems = [];
  const randomTotal = Math.floor(Math.random() * (items.length - 1) + 1);

  for (let i = 0; i < randomTotal; i += 1) {
    const randomItemIndex = Math.floor(Math.random() * items.length);

    randomItems.push(items[randomItemIndex]);
  }

  return randomItems;
};

for (let i = 0; i < 10; i += 1) {
  const randomItems = getRandomItems();

  const order = {
    id: '-',
    reference: nanoid(8).toUpperCase(),
    customer: customers[Math.floor(Math.random() * customers.length)],
    address: `${faker.address.zipCode()} ${faker.address.cityName()} ${faker.address.streetName()}`,
    items: randomItems,
    total: randomItems.reduce((acc, cur) => acc + (cur?.price ?? 0), 0),
    orderDate: faker.datatype.datetime(),
    status: 'ORDERED' as 'ORDERED' | 'DELIVERED' | 'CANCELLED',
  };

  orders.push(order);
}

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  try {
    console.log(0, customers);
    console.log(1, items);
    console.log(2, orders);
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

    // Customers
    for (const customer of customers) {
      await prisma.customer.upsert({
        where: { email: customer.email },
        create: {
          username: customer.username,
          password: customer.password,
          lastName: customer.lastName,
          firstName: customer.firstName,
          email: customer.email,
          age: customer.age,
        },
        update: {},
      });
    }

    // Items
    for (const item of items) {
      await prisma.item.upsert({
        where: { id: item.id },
        create: {
          name: item.name,
          description: item.description,
          price: item.price,
        },
        update: {},
      });
    }

    // Orders
    for (const order of orders) {
      await prisma.order.upsert({
        where: { id: order.id },
        create: {
          reference: order.reference,
          address: order.address,
          status: order.status,
          total: order.total,
          customer: order.customer,
          items: order.items,
          orderDate: order.orderDate,
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

console.log(3, customers);
console.log(4, items);
console.log(5, orders);

main();
