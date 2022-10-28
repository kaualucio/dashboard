import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cancel(id: string | any) {
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        status: 'Cancelado',
        canceled: true,
        canceled_at: new Date(),
      },
    });
    return updatedProject;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro ao mudar o status do projeto para cancelado';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query;

      const updatedProject = await cancel(id).finally(async () => {
        await prisma.$disconnect();
      });

      return res.status(200).json(updatedProject);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ type: 'error', response: error });
    }
  }
}
