import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { filters } = req.body;
    const searchedArticles = await prisma.articles
      .findMany({
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
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200).json(searchedArticles);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
