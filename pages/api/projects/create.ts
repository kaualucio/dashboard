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
  
    const {
      client_id,
      responsible_id,
      title,
      objective,
      description,
      phone,
      type_service,
      budget,
    } = req.body;
  
    if (
      !client_id ||
      !responsible_id ||
      !title ||
      !objective ||
      !description ||
      !type_service ||
      !budget
    ) {
      res.status(406).json({
        type: 'error',
        response: 'Preencha os campos obrigatórios para prosseguir',
      });
    }
  
    const response = await prisma.project
      .create({
        data: {
          id: uuid(),
          client_id,
          title,
          objective,
          description,
          phone,
          responsible_id,
          type_service,
          budget,
          status,
          completed: false,
          canceled: false,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  
    return res.status(201).json({
      type: 'success',
      response: `O projeto foi cadastrado com sucesso.`,
      project: response,
    });
  } catch (error) {
    return res.status(400).json({
      type: 'error',
      response: `Ocorreu um erro ao cadastrar o projeto, tente novamente.`,
    });
  }
}
