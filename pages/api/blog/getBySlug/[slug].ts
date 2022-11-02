import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getBySlug(slug: string | any) {
  try {
    const project = await prisma.articles.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
        category: true,
      },
    });
    return project;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro ao buscar os dados do artigo';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query;

    if (slug) {
      console.log(slug);
      const response = await getBySlug(slug).finally(async () => {
        await prisma.$disconnect();
      });
      console.log(response);
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
