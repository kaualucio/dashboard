import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function searchByFilter(filters: any) {
  try {
    const searchedArticles = await prisma.articles.findMany({
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        published_at:
          filters.orderBy && filters.orderBy === 'asc' ? 'asc' : 'desc',
      },
      where:
        filters.categoryId && filters.reading_time
          ? {
              AND: [
                {
                  categoryId: filters.categoryId,
                },
                {
                  reading_time: filters.reading_time,
                },
              ],
            }
          : filters.categoryId && !filters.reading_time
          ? {
              categoryId: filters.categoryId,
            }
          : !filters.categoryId && filters.reading_time
          ? {
              reading_time: filters.reading_time,
            }
          : {},
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
    const { filters } = req.body;
    const response = await searchByFilter(filters).finally(async () => {
      await prisma.$disconnect();
    });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
