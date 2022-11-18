import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { slug } = req.query;
  if (typeof slug === 'string') {
    const result = await prisma.category
      .findFirst({
        where: {
          slug,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    return res.status(200).json(result);
  }
}
