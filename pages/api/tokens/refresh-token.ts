import { prisma } from './../../../src/prisma/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '../../../src/utils/generate_token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(403).end();
  }

  const refreshTokenExists = await prisma.refreshToken.findFirst({
    where: {
      id: refresh_token,
    },
  });

  if (!refreshTokenExists) {
    return res.status(403).json({ message: 'Refresh Token não existe' });
  }

  const access_token = generateToken({
    userId: refreshTokenExists.userId,
  });

  return res.status(200).json({ access_token });
}
