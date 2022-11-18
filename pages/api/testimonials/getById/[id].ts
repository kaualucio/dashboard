import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id === 'string') {
    const response = await prisma.testimonial
      .findFirst({
        where: {
          id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (!response) {
      return res.status(404).json({
        type: 'error',
        response: 'Não existe nenhuma tarefa com esse ID!',
      });
    }

    return res.status(200).json(response);
  }
}
