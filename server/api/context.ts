import { PrismaClient } from '@prisma/client';

import { Auth, auth } from './auth';
import { db } from './db';

export interface Context {
  db: PrismaClient;
  auth: Auth;
}

export const context: Context = {
  db,
  auth,
};
