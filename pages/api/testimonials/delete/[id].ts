import type { NextApiRequest, NextApiResponse } from 'next';




async function deleteById(id: string | any) {
  try {
    await prisma.testimonial.delete({
      where: {
        id,
      },
    });

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
    const { id } = req.query;
    if (id) {
      const response = await deleteById(id).finally(async () => {
        await prisma.$disconnect();
      });

      return res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: error });
  }
}
