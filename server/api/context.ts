import { Admin, PrismaClient } from '@prisma/client';
import Cookies from 'cookies';
import { Request, Response } from 'koa';

export interface Context {
  prisma: PrismaClient;
  admin: Admin | null;
  request: Request;
  response: Response;
  cookies: Cookies;
}
