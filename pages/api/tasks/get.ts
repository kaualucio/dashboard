import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from '../../../src/lib/isAuthenticated';

const prisma = new PrismaClient();

async function get() {
  try {
    const allArticles = await prisma.todo.findMany({
      include: {
        author: true,
        completed_by_user: true,
      },
      orderBy: {
        completed_at: 'asc',
      },
    });

    return allArticles;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro durante a busca dos artigos';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;

  const isUserAuthenticated = isAuthenticated(authorization);
  if (isUserAuthenticated === 401) {
    return res.status(isUserAuthenticated).json({
      message: 'Token inválido',
    });
  }

  const result = await get().finally(async () => {
    await prisma.$disconnect();
  });

  if (typeof result === 'object') {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
}