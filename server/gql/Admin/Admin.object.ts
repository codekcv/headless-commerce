import { enumType, objectType } from 'nexus';
import { Admin, AdminRole } from 'nexus-prisma';

export const ADMIN = objectType({
  name: Admin.$name,
  definition: (t) => {
    t.field(Admin.id);
    t.field(Admin.username);
    t.field(Admin.passwordHash);
    t.field(Admin.firstName);
    t.field(Admin.lastName);
    t.field(Admin.email);
    t.field(Admin.role);
    t.field(Admin.refreshToken);
  },
});

export const ADMIN_ROLE = enumType(AdminRole);
