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

async function create({
  hirerName,
  hirerCompany,
  hirerEmail,
  testimonial,
}: Testimonial) {
  try {
    const newTestimonial = await prisma.testimonial.create({
      data: {
        id: uuid(),
        hirerName,
        hirerCompany,
        hirerEmail,
        testimonial,
      },
    });

    return newTestimonial;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a criação do depoimento, tente novamente';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { hirerName, hirerCompany, hirerEmail, testimonial } = req.body;

    if (!hirerName || !hirerEmail || !testimonial || !hirerCompany) {
      res.status(406).json({
        typpe: 'error',
        response: 'Preencha os campos obrigatórios para prosseguir',
      });
    }

    const response = await create({
      hirerName,
      hirerCompany,
      hirerEmail,
      testimonial,
    }).finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(201).json({
      type: 'success',
      response: `O depoimento foi cadastrado com sucesso.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
