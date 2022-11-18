import type { NextApiRequest, NextApiResponse } from 'next';

import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id === 'string') {
    const testimonialExists = await prisma.testimonial
      .findFirst({
        where: {
          id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (!testimonialExists) {
      res.status(400).json({
        typpe: 'error',
        response: 'Não existe nenhum depoimento com esse ID',
      });
    }

    await prisma.testimonial
      .update({
        where: {
          id,
        },
        data: {
          ordered_at: new Date(),
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200);
  }
}
