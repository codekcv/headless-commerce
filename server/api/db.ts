import faker from 'faker';
import { nanoid } from 'nanoid';

import { NexusGenObjects } from '../nexus-typegen';

export interface Db {
  admin: NexusGenObjects['Admin'];
  customers: Array<NexusGenObjects['Customer']>;
  items: Array<NexusGenObjects['Item']>;
}

const customers = [];
const items = [];

faker.seed(1);

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
};
