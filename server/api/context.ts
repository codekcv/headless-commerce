import { Db, db } from './db';

export interface Context {
  db: Db;
}

export const context = {
  db,
};
