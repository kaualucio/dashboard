import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';




async function deleteById(id: string | any) {
  try {
    

    return {
      type: 'success',
      response: 'Depoimento deletado com sucesso!',
    };
  } catch (error) {
    // console.log(error)
    return {
      type: 'error',
      response: 'Houve um erro ao deletar o depoimento, tente novamente!',
    };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    const { id } = req.query;
    if (typeof id === 'string') {
      const response = await prisma.testimonial.delete({
        where: {
          id,
        },
      }).finally(async () => {
        await prisma.$disconnect();
      });

      return res.status(200).json({
        type: 'success',
        response: 'Depoimento deletado com sucesso!'
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      type: 'error',
      response: 'Ocorreu um erro ao deletar o depoimento, tente novamente.'
    });
  }
}
