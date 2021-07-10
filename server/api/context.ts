import { Admin, PrismaClient } from '@prisma/client';
import Cookies from 'cookies';

export interface Context {
  prisma: PrismaClient;
  cookies: Cookies;
  admin: Admin | null;
}

export const context: Context = {
  prisma: new PrismaClient(),
  cookies: {} as Cookies,
  admin: null,
};
