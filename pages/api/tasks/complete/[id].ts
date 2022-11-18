import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';

import { taskWasCompletedInTime } from '../../../../src/utils/taskWasCompletedInTime';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { completed_by_user_id } = req.body;

  if (typeof id === 'string') {
    const taskExists = await prisma.todo
      .findFirst({
        where: {
          id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (!taskExists) {
      return res.status(404).json({
        type: 'error',
        response: 'Não existe essa categoria',
      });
    } else {
    }

    const isCompletedInTime = taskWasCompletedInTime(
      taskExists.has_to_start_at,
      taskExists.has_to_finish_at
    );

    const response = await prisma.todo
      .update({
        where: {
          id,
        },
        data: {
          completed: true,
          completed_at: new Date(),
          completed_in_time: isCompletedInTime,
          completed_by_user_id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(200);
  }
}
