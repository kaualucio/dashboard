import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getById(id: string | any) {
  try {
    const project = await prisma.project.findFirst({
      where: {
        id,
      },
      include: {
        responsible: true,
      },
    });
    return project;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (id) {
      const response = await getById(id).finally(async () => {
        await prisma.$disconnect();
      });

      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
