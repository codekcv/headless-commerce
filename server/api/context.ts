import { Admin, PrismaClient } from '@prisma/client';
import Cookies from 'cookies';
import { Request } from 'koa';

export interface Context {
  prisma: PrismaClient;
  request: Request;
  cookies: Cookies;
  me: Admin[];
}
