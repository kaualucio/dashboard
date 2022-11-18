import { readFileSync } from 'fs';

export const JWT_SECRET = readFileSync('jwtRS256.key');

export const SITE_NAME = 'SITE NAME';
