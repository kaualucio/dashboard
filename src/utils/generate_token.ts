import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
interface TokenProps {
  payload?: any;
  expiresIn?: number | string;
  userId?: string | any;
}

export function generateToken({
  payload = {},
  expiresIn = 1200,
  userId = '',
}: TokenProps) {
  const token = sign(payload, JWT_SECRET, {
    expiresIn: expiresIn, //20 minutes
    subject: userId,
    algorithm: 'RS256',
  });

  return token;
}
