import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { id } = req.query;
  if (typeof id === 'string') {
    const categoryExists = await prisma.category
      .findFirst({
        where: {
          id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (!categoryExists) {
      return res.status(404).json({
        type: 'error',
        response: 'Não existe nenhuma categoria com esse nome',
      });
    }

    const deleteAllArticlesOfCategory = prisma.articles.deleteMany({
      where: {
        categoryId: id,
      },
    });
    const deleteCategory = prisma.category.delete({
      where: {
        id,
      },
    });
    await prisma
      .$transaction([deleteAllArticlesOfCategory, deleteCategory])
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200).json({ type: 'success' });
  }
}
