import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

interface Testimonial {
  client_id: string;
  title: string;
  objective: string;
  description: string;
  phone?: string;
  type_service: string[];
  budget: number;
  status: 'Em andamento';
  completed: boolean;
  canceled: boolean;
}

async function create({
  client_id,
  title,
  objective,
  description,
  phone,
  type_service,
  budget,
  status,
  completed,
  canceled,
}: Testimonial) {
  try {
    const newProject = await prisma.project.create({
      data: {
        id: uuid(),
        client_id,
        title,
        objective,
        description,
        phone,
        type_service,
        budget,
        status,
        completed,
        canceled,
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
    const {
      client_id,
      title,
      objective,
      description,
      phone,
      type_service,
      budget,
    } = req.body;

    if (
      !client_id ||
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

    const response = await create({
      client_id,
      title,
      objective,
      description,
      phone,
      type_service,
      budget,
      status: 'Em andamento',
      completed: false,
      canceled: false,
    }).finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(201).json({
      type: 'success',
      response: `O projeto foi cadastrado com sucesso.`,
      project: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
