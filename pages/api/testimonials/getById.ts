import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function get(id: string) {
  try {
    const testimonial = await prisma.testimonial.findFirst({
      where: {
        id,
      },
    });

    return testimonial;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a busca do depoimento';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    const response = await get(id).finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
