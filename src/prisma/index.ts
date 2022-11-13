import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

(async () => {
  try {
    // console.log(await prisma.widget.create({ data: {} }));
  } catch (err) {
    console.error('error executing query:', err);
  } finally {
    prisma.$disconnect();
  }
})();
