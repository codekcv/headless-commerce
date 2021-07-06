import { PrismaClient } from '@prisma/client';

import { Auth, auth } from './auth';

export interface Context {
  prisma: PrismaClient;
  auth: Auth;
}

export const context: Context = {
  prisma: new PrismaClient(),
  auth,
};
