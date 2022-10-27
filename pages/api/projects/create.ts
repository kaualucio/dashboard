import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

interface Testimonial {
  hirerName: string;
  title: string;
  responsible_id: string;
  responsible_email: string;
  phone?: string;
  type_service: string[];
  budget: number;
  status: 'Em andamento';
  completed: boolean;
  canceled: boolean;
}

async function create({
  hirerName,
  title,
  responsible_id,
  responsible_email,
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
        hirerName,
        title,
        responsible_id,
        responsible_email,
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
      hirerName,
      title,
      responsible_id,
      responsible_email,
      phone,
      type_service,
      budget,
    } = req.body;

    if (
      !hirerName ||
      !title ||
      !responsible_id ||
      !responsible_email ||
      !type_service ||
      !budget
    ) {
      res.status(406).json({
        typpe: 'error',
        response: 'Preencha os campos obrigatórios para prosseguir',
      });
    }

    const response = await create({
      hirerName,
      title,
      responsible_id,
      responsible_email,
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
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
