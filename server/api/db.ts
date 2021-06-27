import { NexusGenObjects } from '../nexus-typegen';

export interface Db {
  admin: NexusGenObjects['Admin'];
  customers: Array<NexusGenObjects['Customer']>;
  items: Array<NexusGenObjects['Item']>;
}

export const db: Db = {
  admin: {
    id: 0,
    username: 'codekcv',
    password: 'plaintext',
    firstName: 'Christian',
    lastName: 'Villamin',
    email: 'ChristianVillamin31@gmail.com',
  },
  customers: [],
  items: [
    {
      id: 1,
      name: 'gago',
      description: 'burat',
      price: 420,
    },
  ],
};
