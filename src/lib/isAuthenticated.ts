import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export function isAuthenticated(access_token: string | undefined) {
  const token = access_token?.split(' ')[1];

  if (!token || typeof token === 'undefined') {
    return 401;
  }
  verify(token, JWT_SECRET, (err, _) => {
    if (err && err.name === 'TokenExpiredError') {
      return 401;
    } else {
      return 200;
    }
  });
}
