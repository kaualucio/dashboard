import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

interface Testimonial {
  hirerName: string;
  hirerCompany: string;
  hirerEmail: string;
  testimonial: string;
}

async function update(
  { hirerName, hirerCompany, hirerEmail, testimonial }: Testimonial,
  id: string
) {
  try {
    const newTestimonial = await prisma.testimonial.update({
      where: {
        id,
      },
      data: {
        hirerName,
        hirerCompany,
        hirerEmail,
        testimonial,
      },
    });

    return newTestimonial;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a edição do depoimento, tente novamente';
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
    return 'Ocorreu um erro durante a edição do depoimento, tente novamente';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, hirerName, hirerCompany, hirerEmail, testimonial } = req.body;

    if (!hirerName || !hirerEmail || !testimonial || !hirerCompany) {
      res.status(406).json({
        typpe: 'error',
        response: 'Preencha os campos obrigatórios para prosseguir',
      });
    }

    const testimonialExists = await exists(id).finally(async () => {
      await prisma.$disconnect();
    });

    if (!testimonialExists) {
      res.status(400).json({
        typpe: 'error',
        response: 'Não existe nenhum depoimento com esse ID',
      });
    }

    await update(
      {
        hirerName,
        hirerCompany,
        hirerEmail,
        testimonial,
      },
      id
    ).finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(200).json({
      type: 'success',
      response: `O depoimento foi atualizado com sucesso.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
