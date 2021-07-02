import faker from 'faker';
import { nanoid } from 'nanoid';

import { NexusGenObjects } from '../nexus-typegen';

export interface Db {
  admin: NexusGenObjects['Admin'];
  customers: Array<NexusGenObjects['Customer']>;
  items: Array<NexusGenObjects['Item']>;
  orders: Array<NexusGenObjects['Order']>;
}

const customers: NexusGenObjects['Customer'][] = [];
const items: NexusGenObjects['Item'][] = [];
const orders: NexusGenObjects['Order'][] = [];

for (let i = 0; i < 10; i += 1) {
  const customer: NexusGenObjects['Customer'] = {
    id: nanoid(),
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
  const item: NexusGenObjects['Item'] = {
    id: nanoid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
  };

  items.push(item);
}

const getRandomItems = () => {
  const randomItems: NexusGenObjects['Item'][] = [];
  const randomTotal = Math.floor(Math.random() * (items.length - 1) + 1);

  for (let i = 0; i < randomTotal; i += 1) {
    const randomItemIndex = Math.floor(Math.random() * items.length);

    randomItems.push(items[randomItemIndex]);
  }

  return randomItems;
};

for (let i = 0; i < 10; i += 1) {
  const order: NexusGenObjects['Order'] = {
    id: nanoid(),
    reference: nanoid(8).toUpperCase(),
    customer: customers[Math.floor(Math.random() * customers.length)],
    address: `${faker.address.zipCode()} ${faker.address.cityName()} ${faker.address.streetName()}`,
    items: getRandomItems(),
    total: 123,
    orderDate: String(faker.datatype.datetime()),
    status: 'ORDERED',
  };

  orders.push(order);
}

// Temporary in-memory database.
export const db: Db = {
  admin: {
    id: nanoid(),
    username: 'demo1user',
    password: 'demo1pass',
    firstName: 'Lorem',
    lastName: 'Ipsum',
    email: 'loremipsum@email.com',
  },
  customers,
  items,
  orders,
};
