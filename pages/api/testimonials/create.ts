import type { NextApiRequest, NextApiResponse } from 'next';

import { v4 as uuid } from 'uuid';
import { prisma } from '../../../src/prisma';

interface Testimonial {
  hirerName: string;
  hirerCompany: string;
  hirerEmail: string;
  testimonial: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    const { hirerName, hirerCompany, hirerEmail, testimonial } = req.body;

    if (!hirerName || !hirerEmail || !testimonial || !hirerCompany) {
      res.status(406).json({
        type: 'error',
        response: 'Preencha os campos obrigatórios para prosseguir',
      });
    }

    await prisma.testimonial
      .create({
        data: {
          id: uuid(),
          hirerName,
          hirerCompany,
          hirerEmail,
          testimonial,
        },
      })
      .finally(async () => {
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
