import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      return res.status(405).end();
    }
    const { id } = req.query;
  
    if (typeof id === 'string') {
      const clientExists = prisma.client.findFirst({
        where: {
          id,
        },
      });
  
      if (!clientExists) {
        return res.status(404).json({
          type: 'error',
          response: 'Não existe nenhum cliente com esse ID!',
        });
      }
  
      const deleteProjectsClient = prisma.project.deleteMany({
        where: {
          client_id: id,
        },
      });
  
      const deleteClient = prisma.client.delete({
        where: {
          id,
        },
      });
  
      await prisma
        .$transaction([deleteProjectsClient, deleteClient])
        .finally(async () => {
          await prisma.$disconnect();
        });
  
      return res.status(200).json({ type: 'success' });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ type: 'error' });
  }
}
