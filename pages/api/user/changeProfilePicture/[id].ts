import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    const { id } = req.query;
    const { url } = req.body;
    
    if (typeof id === 'string') {
      const userExists = await prisma.user
        .findFirst({
          where: {
            id,
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
  
      if (!userExists) {
        return res.status(404).json({
          type: 'error',
          response: 'Não existe nenhum usuário com esse ID!',
        });
      }
  
      await prisma.user
        .update({
          where: {
            id,
          },
          data: {
            profile_picture: url
          }
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
  
      return res.status(200)
    }
  } catch (error) {
    console.log(error)
    return res.status(400)
  }
}
