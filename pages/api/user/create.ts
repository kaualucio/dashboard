import type { NextApiRequest, NextApiResponse } from 'next';

import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { loginGenerator } from '../../../src/utils/login-generator';
import { passwordGenerator } from '../../../src/utils/password-genarator';
import { prisma } from '../../../src/prisma';

interface UserData {
  name: string;
  email: string;
  role: string;
  login: string;
  password: string;
  profile_picture: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, role, profile_picture } = req.body;

  if (!name || !email || !role) {
    res.status(406).json({
      typpe: 'error',
      response: 'Preencha os campos corretamente para prosseguir',
    });
  }

  const userExistsByEmail = await prisma.user
    .findFirst({
      where: {
        email,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  if (userExistsByEmail) {
    return res.status(403).json({
      type: 'error',
      response: 'Já existe um usuário com esse email',
    });
  }

  const randomLogin = loginGenerator();
  const hashedPassword = await hash(passwordGenerator(), 10);

  const result = await prisma.user
    .create({
      data: {
        id: uuid(),
        name,
        email,
        role,
        login: randomLogin,
        password: hashedPassword,
        profile_picture,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return res.status(201).json({
    type: 'success',
    response: `Usuário ${name} foi criado com sucesso! Um email com um link verificação e informações de login para enviados para o email usado no cadastro.`,
  });
}
