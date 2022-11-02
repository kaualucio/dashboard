import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

async function getCategoryBySlug(slug: string | any) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        slug,
      },
    });

    return category;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro ao buscar a categoria';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query;
    const result = await getCategoryBySlug(slug).finally(async () => {
      await prisma.$disconnect();
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
