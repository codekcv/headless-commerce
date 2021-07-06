import { Admin } from '@prisma/client';

export type Auth = { ok: boolean; admin: Admin | null };
export const auth: Auth = { ok: false, admin: null };
