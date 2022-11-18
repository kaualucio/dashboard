import type { NextApiRequest, NextApiResponse } from 'next';

import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { hirerName, hirerCompany, hirerEmail, testimonial } = req.body;
  if (typeof id === 'string') {
    if (!hirerName || !hirerEmail || !testimonial || !hirerCompany) {
      res.status(406).json({
        typpe: 'error',
        response: 'Preencha os campos obrigatórios para prosseguir',
      });
    }

    const testimonialExists = await prisma.testimonial
      .findFirst({
        where: {
          id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (!testimonialExists) {
      res.status(400).json({
        typpe: 'error',
        response: 'Não existe nenhum depoimento com esse ID',
      });
    }

    await prisma.testimonial
      .update({
        where: {
          id,
        },
        data: {
          hirerName,
          hirerCompany,
          hirerEmail,
          testimonial,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200).json({
      type: 'success',
      response: `O depoimento foi atualizado com sucesso.`,
    });
  }
}
