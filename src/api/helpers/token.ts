import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();
const secretKey = process.env.SECRET_KEY || 'super-secret';

export const generateToken = (data: string | object | Buffer) => {
  return jwt.sign({ data }, secretKey, { expiresIn: '7d' });
};

export const decryptToken = (token: string) => {
  return jwt.verify(token, secretKey);
};
