import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if(req.method !== 'GET') {
      return res.status(405).end()
    }
    const { slug } = req.query;

    if (typeof slug === 'string') {
      const response = await prisma.articles
        .findFirst({
          where: {
            slug,
          },
          include: {
            author: true,
            category: true,
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
