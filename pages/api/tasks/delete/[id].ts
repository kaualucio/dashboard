import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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
  
      return res.status(200).json({ type: 'success', response: 'A tarefa foi deletada com sucesso!' });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ type: 'error', response: 'Ocorreu um erro ao deletar a tarefa, tente novamente.' });
  }
}
