import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { id } = req.query;

  if (typeof id === 'string') {
    const taskExists = await prisma.todo
      .findFirst({
        where: {
          id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (!taskExists) {
      return res.status(404).json({
        type: 'error',
        response: 'Não existe nenhuma tarefa com esse ID!',
      });
    }

    await prisma.todo
      .delete({
        where: {
          id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200).json({ type: 'success' });
  }
}
