import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../src/prisma';
import { slugify } from '../../../src/utils/slugfy';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { category } = req.body;
  try {
  
    if (!category) {
      res.status(406).json({
        type: 'error',
        response: 'Preencha os campos corretamente para prosseguir',
      });
    }
  
    const categoryExists = await prisma.category
      .findFirst({
        where: {
          name: category,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  
    if (categoryExists) {
      return res.status(403).json({
        type: 'error',
        response: 'Já existe uma categoria com esse nome',
      });
    }
  
    await prisma.category
      .create({
        data: {
          id: uuid(),
          name: category,
          slug: slugify(category),
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  
    return res.status(201).json({
      type: 'success',
      response: `A categoria ${category} foi criada com sucesso.`,
    });
  } catch (error) {
    return res.status(400).json({
      type: 'error',
      response: `Ocorreu um erro ao criar a categoria ${category}.`,
    });
  }
}
