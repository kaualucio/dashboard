import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.headers.authorization) {
    return res.status(403).end();
  }

  const token = req.headers?.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).end();
  }

  const decodedData = verify(token, 'supersecretsecreta');
  if (Date.now() < decodedData.exp) {
    return res.status(401).end();
  }

  return res.status(200).end();
}
