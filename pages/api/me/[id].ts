import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from '../../../src/lib/isAuthenticated';

const prisma = new PrismaClient();

async function getMyData(id: string | any) {
  try {
    const me = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Project: true,
        articles: true,
      },
    });

    return me;
  } catch (error) {
    console.log(error);
    return 'Ocorreu ao buscar seus dados, tente novamente';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { authorization } = req.headers;

  const isUserAuthenticated = isAuthenticated(authorization);
  if (isUserAuthenticated === 401) {
    return res.status(isUserAuthenticated).json({
      message: 'Token inválido',
    });
  }

  const response = await getMyData(id).finally(async () => {
    await prisma.$disconnect();
  });

  return res.status(200).json(response);
}
