import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

async function publishArticle(id: string | any) {
  try {
    return;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro ao publicar o artigo';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query;
      if (typeof id === 'string') {
        await prisma.articles
          .update({
            where: {
              id,
            },
            data: {
              isPublished: true,
              published_at: new Date(),
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
        return res.status(200).json({ type: 'success' });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ type: 'error', response: error });
    }
  }
}
