import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const allArticles = await prisma.articles
      .findMany({
        include: {
          author: true,
          category: true,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200).json(allArticles);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
