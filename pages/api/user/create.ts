import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { loginGenerator } from '../../../src/utils/login-generator';
import { passwordGenerator } from '../../../src/utils/password-genarator';

const prisma = new PrismaClient();

interface UserData {
  name: string;
  email: string;
  role: string;
  login: string;
  password: string;
  profile_picture: string;
}

async function create({
  name,
  email,
  role,
  login,
  password,
  profile_picture,
}: UserData) {
  try {
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        name,
        email,
        role,
        login,
        password,
        profile_picture,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro durante a criação do usuário, tente novamente';
  }
}

async function userAlreadyExistsByEmail(email: string) {
  try {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return userAlreadyExists ? true : false;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro durante a criação do usuário, tente novamente';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, role, profile_picture } = req.body;

    if (!name || !email || !role) {
      res.status(406).json({
        typpe: 'error',
        response: 'Preencha os campos corretamente para prosseguir',
      });
    }

    const userExistsByEmail = await userAlreadyExistsByEmail(email).finally(
      async () => {
        await prisma.$disconnect();
      }
    );

    if (userExistsByEmail) {
      return res.status(403).json({
        type: 'error',
        response: 'Já existe um usuário com esse email',
      });
    }

    const randomLogin = loginGenerator();
    const randomPassword = passwordGenerator();

    const hashedPassword = await hash(randomPassword, 10);

    const result = await create({
      name,
      email,
      role,
      login: randomLogin,
      password: hashedPassword,
      profile_picture,
    }).finally(async () => {
      await prisma.$disconnect();
    });

    return res.status(201).json({
      type: 'success',
      response: `Usuário ${name} foi criado com sucesso! Um email com um link verificação e informações de login para enviados para o email usado no cadastro.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: 'error', response: error });
  }
}
