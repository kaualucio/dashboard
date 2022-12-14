import { prisma } from '../../../src/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

interface TaskInfo {
  title: string;
  description: string;
  priority: string;
  has_to_start_at: string;
  has_to_finish_at: string;
  author_id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    const {
      title,
      description,
      priority,
      has_to_start_at,
      has_to_finish_at,
      author_id,
    } = req.body;
  
    if (!title || !has_to_finish_at || !has_to_start_at) {
      return res.status(406).json({
        type: 'error',
        response: 'Campos em branco não são permitido!',
      });
    }
  
    const result = await prisma.todo
      .create({
        data: {
          title,
          description,
          priority,
          has_to_start_at: new Date(has_to_start_at),
          has_to_finish_at: new Date(has_to_start_at),
          author_id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  
    return res.status(201).json({
      type: 'success',
      response: 'Tarefa cadastrada com sucesso!'
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      type: 'error',
      response: 'Ocorreu um erro ao criar a tarefa, tente novamente.'
    });
  }
}
