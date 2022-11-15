import { sign } from 'jsonwebtoken';
interface AccessTokenProps {
  payload?: any;
  expiresIn?: number | string;
  userId: string | any;
}

export function generateAccessToken({
  payload = {},
  expiresIn = 60,
  userId,
}: AccessTokenProps) {
  const access_token = sign({}, 'supersecretsecreta', {
    expiresIn: expiresIn, //20 minutes
    subject: userId,
  });

  return access_token;
}
