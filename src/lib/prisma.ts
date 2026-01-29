import { PrismaClient } from '../generated/prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Use PRISMA_DATABASE_URL (Accelerate) for queries, fallback to DATABASE_URL
const databaseUrl = import.meta.env.PRISMA_DATABASE_URL || import.meta.env.DATABASE_URL;

export const prisma = globalThis.prisma ?? new PrismaClient({
  datasourceUrl: databaseUrl,
});

if (import.meta.env.DEV) {
  globalThis.prisma = prisma;
}
