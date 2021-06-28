import { nanoid } from 'nanoid';

import { NexusGenObjects } from '../nexus-typegen';

export interface Db {
  admin: NexusGenObjects['Admin'];
  customers: Array<NexusGenObjects['Customer']>;
  items: Array<NexusGenObjects['Item']>;
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
  customers: [],
  items: [
    {
      id: nanoid(),
      name: 'Apple',
      description:
        'A tasty snack. But did you know that shinigami only eat apples?',
      price: 420.69,
    },
  ],
};
