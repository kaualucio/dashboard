import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { slugify } from '../../../../src/utils/slugfy';

const prisma = new PrismaClient();

async function editCategory(category: string, id: string | any) {
  try {
    const newCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: category,
        slug: slugify(category),
        updated_at: new Date(),
      },
    });

    return newCategory;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a criação da categoria, tente novamente';
  }
}

async function categoryAlreadyExists(id: string | any) {
  try {
    const categoryAlreadyExists = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    return categoryAlreadyExists ? true : false;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a categoria, tente novamente';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { category } = req.body;
    const { id } = req.query;

    if (!category) {
      res.status(406).json({
        type: 'error',
        response: 'Preencha os campos corretamente para prosseguir',
      });
    }

    const categoryExists = await categoryAlreadyExists(id).finally(async () => {
      await prisma.$disconnect();
    });

    if (!categoryExists) {
      return res.status(403).json({
        type: 'error',
        response: 'Não existe essa categoria',
      });
    }

    const response = await editCategory(category, id).finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(201).json({
      type: 'success',
      response: `A categoria foi atualizada com sucesso.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
