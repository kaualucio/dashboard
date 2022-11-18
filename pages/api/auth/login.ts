import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../src/prisma';
import { generateToken } from '../../../src/utils/generate_token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { login, password } = req.body;

  if (!login || !password) {
    return res
      .status(422)
      .json({ error: 'Campos em branco não são permitidos!' });
  }

  const userExists = await prisma.user.findFirst({
    where: {
      login,
    },
  });

  if (!userExists) {
    return res
      .status(404)
      .json({ error: `O usuário com o ${login} não existe!` });
  }

  const matchedPassword = await compare(password, userExists.password);

  if (!matchedPassword) {
    return res
      .status(400)
      .json({ error: `Login/Senha inválidos, tente novamente!` });
  }

  const refreshToken = await prisma.refreshToken.findFirst({
    where: {
      userId: userExists.id,
    },
  });

  const access_token = generateToken({ userId: userExists.id, expiresIn: 15 });
  const session_token = generateToken({
    payload: { uid: userExists.id },
    expiresIn: '1 day',
  });
  if (refreshToken) {
    const refreshTokenExpired = moment().isAfter(
      moment.unix(refreshToken.expiresIn)
    );
    if (refreshTokenExpired) {
      await prisma.refreshToken.delete({
        where: {
          id: refreshToken.id,
        },
      });

      const newRefreshToken = await prisma.refreshToken.create({
        data: {
          id: uuid(),
          userId: userExists.id,
          expiresIn: moment().add(1, 'day').unix(),
        },
      });

      return res.status(200).json({
        access_token,
        refresh_token: newRefreshToken.id,
        session_token,
      });
    }

    return res
      .status(200)
      .json({ access_token, refresh_token: refreshToken.id, session_token });
  }

  const newRefreshToken = await prisma.refreshToken.create({
    data: {
      id: uuid(),
      userId: userExists.id,
      expiresIn: moment().add(1, 'day').unix(),
    },
  });

  return res
    .status(200)
    .json({ access_token, refresh_token: newRefreshToken.id, session_token });
}
