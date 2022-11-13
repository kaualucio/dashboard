import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface TaskInfo {
  title: string;
  description: string;
  priority: string;
  has_to_start_at: string;
  has_to_finish_at: string;
  author_id: string;
}

const prisma = new PrismaClient();

async function create({
  title,
  description,
  priority,
  has_to_start_at,
  has_to_finish_at,
  author_id,
}: TaskInfo) {
  try {
    await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        has_to_start_at: new Date(has_to_start_at),
        has_to_finish_at: new Date(has_to_start_at),
        author_id,
      },
    });

    return {
      type: 'success',
      message: 'Tarefa criada com sucesso!',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'error',
      message: 'Ocorreu um erro ao criar a tarefa, tente novamente!',
    };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  const result = await create({
    title,
    description,
    priority,
    has_to_start_at,
    has_to_finish_at,
    author_id,
  }).finally(async () => {
    await prisma.$disconnect();
  });

  if (result.type === 'success') {
    return res.status(201).json(result);
  } else {
    return res.status(400).json(result);
  }
}
