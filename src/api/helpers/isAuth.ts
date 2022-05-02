/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

import { decryptToken } from './token';

config();
const NODE_ENV = process.env.NODE_ENV || 'development';

const isAuth = (req: any, res: any, next: any) => {
  const bearerHeader = req.headers.authorization;

  if (NODE_ENV === 'test') {
    next();
    return;
  }

  try {
    if (!bearerHeader) throw new Error('No token provided');

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const token = decryptToken(bearerToken);
    const userId = (token as jwt.JwtPayload)?.userId;

    req.userId = userId;

    next();
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: 'No valid token provided',
    });
  }
};

export default isAuth;
