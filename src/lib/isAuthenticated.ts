import { verify } from 'jsonwebtoken';

export function isAuthenticated(access_token: string | undefined) {
  const token = access_token?.split(' ')[1];

  if (!token || typeof token === 'undefined') {
    return 401;
  }
  const decodedData = verify(token, 'supersecretsecreta');
  if (Date.now() < decodedData.exp) {
    return 401;
  }

  return 200;
}
