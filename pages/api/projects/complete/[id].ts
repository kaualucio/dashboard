import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id === 'string') {
    await prisma.project
      .update({
        where: {
          id,
        },
        data: {
          status: 'Completo',
          completed: true,
          completed_at: new Date(),
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200);
  }
}
