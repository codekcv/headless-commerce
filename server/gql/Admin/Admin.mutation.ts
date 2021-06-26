import { mutationField, stringArg } from 'nexus';

export const AdminMutation = mutationField('updateAdmin', {
  type: 'Admin',
  args: {
    firstName: stringArg(),
    lastName: stringArg(),
  },
  resolve: (_root, args, ctx) => {
    const { admin } = ctx.db;

    const validValues: Record<string, any> = {};

    Object.entries(args).forEach(([key, value]) => {
      if (value) validValues[key] = value;
    });

    const updatedAdmin = { ...admin, ...validValues };

    ctx.db.admin = updatedAdmin;

    return updatedAdmin;
  },
});
