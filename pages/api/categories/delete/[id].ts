import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteCategory(id: string | any) {
  try {
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
    await prisma.$transaction([deleteAllArticlesOfCategory, deleteCategory]);
    return;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro ao deletar a categoria';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query;

      await deleteCategory(id).finally(async () => {
        await prisma.$disconnect();
      });

      return res.status(200).json({ type: 'success' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ type: 'error', response: error });
    }
  }
}
