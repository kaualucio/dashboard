import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if(req.method !== 'POST') {
      return res.status(405).end()
    }
    const { searchTerm } = req.body;
    const searchedArticles = await prisma.articles
      .findMany({
        include: {
          author: true,
          category: true,
        },
        where: {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
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
