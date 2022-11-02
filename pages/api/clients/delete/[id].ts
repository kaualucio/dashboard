import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteClient(id: string | any) {
  try {
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

    await prisma.$transaction([deleteProjectsClient, deleteClient]);
    return;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro ao deletar o cliente';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query;
      console.log(id);
      await deleteClient(id).finally(async () => {
        await prisma.$disconnect();
      });

      return res.status(200).json({ type: 'success' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ type: 'error', response: error });
    }
  }
}
