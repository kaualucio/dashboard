import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../src/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    const { name, email, phone, image } = req.body;
    if (!name || !email || !phone) {
      res.status(406).json({
        type: 'error',
        response: 'Preencha os campos obrigatórios para prosseguir',
      });
    }

    const response = await prisma.client
      .create({
        data: {
          id: uuid(),
          name,
          email,
          phone,
          image,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(201).json({
      type: 'success',
      response: `O cliente ${name} foi cadastrado com sucesso.`,
      project: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
