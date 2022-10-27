import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { slugify } from '../../../src/utils/slugfy';

const prisma = new PrismaClient();

async function create(category: string) {
  try {
    const newCategory = await prisma.category.create({
      data: {
        id: uuid(),
        name: category,
        slug: slugify(category),
      },
    });

    return newCategory;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a criação da categoria, tente novamente';
  }
}

async function categoryAlreadyExists(category: string) {
  try {
    const categoryAlreadyExists = await prisma.category.findFirst({
      where: {
        name: category,
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

    if (!category) {
      res.status(406).json({
        typpe: 'error',
        response: 'Preencha os campos corretamente para prosseguir',
      });
    }

    const categoryExists = await categoryAlreadyExists(category).finally(
      async () => {
        await prisma.$disconnect();
      }
    );

    if (categoryExists) {
      return res.status(403).json({
        type: 'error',
        response: 'Já existe uma categoria com esse nome',
      });
    }

    const response = await create(category).finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(201).json({
      type: 'success',
      response: `A categoria ${category} foi criada com sucesso.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
