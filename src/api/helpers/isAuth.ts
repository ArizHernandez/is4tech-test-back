/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

import { decryptToken } from './token';

const isAuth = (req: any, res: any, next: any) => {
  const bearerHeader = req.headers.authorization;

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
