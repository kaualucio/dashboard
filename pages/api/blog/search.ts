import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function search(term: string) {
  try {
    const searchedArticles = await prisma.articles.findMany({
      include: {
        author: true,
        category: true,
      },
      where: {
        title: {
          contains: term,
          mode: 'insensitive',
        },
      },
    });

    return searchedArticles;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro durante a busca dos artigos';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { searchTerm } = req.body;
    console.log(searchTerm);
    const response = await search(searchTerm).finally(async () => {
      await prisma.$disconnect();
    });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
