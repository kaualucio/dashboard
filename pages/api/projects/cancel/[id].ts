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
      const updatedProject = await prisma.project
        .update({
          where: {
            id,
          },
          data: {
            status: 'Cancelado',
            canceled: true,
            canceled_at: new Date(),
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
  
      return res.status(200).json(updatedProject);
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      type: 'error', 
      response: `Ocorreu um erro ao cancelar o projeto, tente novamente.`});
  }
}
