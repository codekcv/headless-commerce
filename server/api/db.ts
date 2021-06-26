export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Db {
  admin: Admin;
}

export const db: Db = {
  admin: {
    id: 0,
    firstName: 'Christian',
    lastName: 'Villamin',
    email: 'ChristianVillamin31@gmail.com',
  },
};
