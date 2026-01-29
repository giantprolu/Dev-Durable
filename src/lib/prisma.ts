import { PrismaClient } from '../generated/prisma/client.ts';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma ?? new PrismaClient({
  datasourceUrl: import.meta.env.DATABASE_URL,
});

if (import.meta.env.DEV) {
  globalThis.prisma = prisma;
}
