import type { NextApiRequest, NextApiResponse } from 'next';

import { isAuthenticated } from '../../../src/lib/isAuthenticated';
import { prisma } from '../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  const { id } = req.query;
  const { authorization } = req.headers;

  const isUserAuthenticated = isAuthenticated(authorization);
  if (isUserAuthenticated === 401) {
    return res.status(isUserAuthenticated).json({
      message: 'Token inválido',
    });
  }

  if (typeof id === 'string') {
    const response = await prisma.user
      .findUnique({
        where: {
          id,
        },
        include: {
          Project: true,
          articles: true,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200).json(response);
  }
}
