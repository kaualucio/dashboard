import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../src/prisma';
import { slugify } from '../../../../src/utils/slugfy';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.body;
  const { id } = req.query;

  if (typeof id === 'string') {
    if (!category) {
      res.status(406).json({
        type: 'error',
        response: 'Preencha os campos corretamente para prosseguir',
      });
    }

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
      return res.status(403).json({
        type: 'error',
        response: 'Não existe essa categoria',
      });
    }

    const response = await prisma.category
      .update({
        where: {
          id,
        },
        data: {
          name: category,
          slug: slugify(category),
          updated_at: new Date(),
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200).json({
      type: 'success',
      response: `A categoria foi atualizada com sucesso.`,
    });
  }
}
