import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function complete(id: string | any) {
  try {
    const projects = await prisma.project.update({
      where: {
        id,
      },
      data: {
        status: 'Completo',
        completed: true,
        completed_at: new Date(),
      },
    });
    return projects;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro ao mudar o status do projeto para completo';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    if (id) {
      await complete(id).finally(async () => {
        await prisma.$disconnect();
      });

      return res.status(200);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
