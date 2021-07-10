import { PrismaClient } from '@prisma/client';
import Cookies from 'cookies';

export interface Context {
  prisma: PrismaClient;
  cookies: Cookies;
}

export const context: Context = {
  prisma: new PrismaClient(),
  cookies: {} as Cookies,
};
