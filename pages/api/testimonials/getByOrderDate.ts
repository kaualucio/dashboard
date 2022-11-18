import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.testimonial
      .findMany({
        orderBy: {
          ordered_at: 'desc',
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
