import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function get() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        responsible: true,
      },
    });
    return projects;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a busca dos projetos';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await get().finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
