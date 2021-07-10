import { objectType } from 'nexus';
import { Admin } from 'nexus-prisma';

export const ADMIN = objectType({
  name: Admin.$name,
  definition: (t) => {
    t.field(Admin.id);
    t.field(Admin.username);
    t.field(Admin.passwordHash);
    t.field(Admin.firstName);
    t.field(Admin.lastName);
    t.field(Admin.email);
    t.field(Admin.refreshToken);
  },
});
