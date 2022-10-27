import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function update(id: string) {
  try {
    const newTestimonial = await prisma.testimonial.update({
      where: {
        id,
      },
      data: {
        ordered_at: new Date(),
      },
    });

    return newTestimonial;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a ordenação do depoimento, tente novamente';
  }
}

async function exists(id: string) {
  try {
    const testimonialExists = await prisma.testimonial.findFirst({
      where: {
        id,
      },
    });

    return testimonialExists ? true : false;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a ordenação do depoimento, tente novamente';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;

    const testimonialExists = await exists(id).finally(async () => {
      await prisma.$disconnect();
    });

    if (!testimonialExists) {
      res.status(400).json({
        typpe: 'error',
        response: 'Não existe nenhum depoimento com esse ID',
      });
    }

    await update(id).finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
