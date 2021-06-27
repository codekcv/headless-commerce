import { Auth, auth } from './auth';
import { Db, db } from './db';

export interface Context {
  db: Db;
  auth: Auth;
}

export const context: Context = {
  db,
  auth,
};
