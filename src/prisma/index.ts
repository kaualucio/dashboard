import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

(async () => {
  try {
    console.log('EXECUTING QUERY');
  } catch (err) {
    console.error('error executing query:', err);
  } finally {
    prisma.$disconnect();
  }
})();
