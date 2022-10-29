import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

interface Client {
  name: string;
  email: string;
  phone: string;
  image?: string;
}

async function create({ name, email, phone, image }: Client) {
  try {
    const newProject = await prisma.client.create({
      data: {
        id: uuid(),
        name,
        email,
        phone,
        image,
      },
    });

    return newProject;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a criação do projeto, tente novamente';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, phone, image } = req.body;
    if (!name || !email || !phone) {
      res.status(406).json({
        type: 'error',
        response: 'Preencha os campos obrigatórios para prosseguir',
      });
    }

    const response = await create({
      name,
      email,
      phone,
      image,
    }).finally(async () => {
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
