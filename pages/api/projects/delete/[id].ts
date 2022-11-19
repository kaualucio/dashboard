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
      const projectExist = await prisma.project
        .findFirst({
          where: {
            id,
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
  
      if (!projectExist) {
        return res.status(405).json({
          type: 'error',
          response: 'Não existe nenhum projeto com esse ID!',
        });
      }
  
      await prisma.project
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
  } catch (error) {
    console.log(error)
    return res.status(200).json({ type: 'error' });
  }
}
