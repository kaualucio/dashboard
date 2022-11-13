import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { taskWasCompletedInTime } from '../../../../src/utils/taskWasCompletedInTime';

const prisma = new PrismaClient();

async function completeTask(
  id: string | any,
  completed_by_user_id: string,
  completed_in_time: boolean
) {
  try {
    const newCategory = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed: true,
        completed_at: new Date(),
        completed_in_time,
        completed_by_user_id,
      },
    });

    return newCategory;
  } catch (error) {
    console.log(error);
    return 'Ocorreu ao completar a tarefa, tente novamente';
  }
}

async function taskRealyExists(id: string | any) {
  const taskExists = await prisma.todo.findFirst({
    where: {
      id,
    },
  });

  return taskExists;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { completed_by_user_id } = req.body;

  const taskExists = await taskRealyExists(id).finally(async () => {
    await prisma.$disconnect();
  });

  if (!taskExists) {
    return res.status(403).json({
      type: 'error',
      response: 'Não existe essa categoria',
    });
  } else {
  }

  const isCompletedInTime = taskWasCompletedInTime(
    taskExists.has_to_start_at,
    taskExists.has_to_finish_at
  );

  const response = await completeTask(
    id,
    completed_by_user_id,
    isCompletedInTime
  ).finally(async () => {
    await prisma.$disconnect();
  });

  return res.status(200);
}
