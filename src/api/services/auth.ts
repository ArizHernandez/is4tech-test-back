import { config } from 'dotenv';
import { AES, enc } from 'crypto-js';

import User from '../../db/models/user';

import * as userDal from '../../db/dal/user';
import { ErrorHandler } from '../helpers/errorHandler';
import { UserInput } from '../../db/dto/user';
import { generateToken } from '../helpers/token';

config();
const secretKey = process.env.SECRET_KEY || 'super-secret';

export const login = async (payload: UserInput) => {
  const user = await userDal.getByUser(payload.user);

  if (!user) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  const decryptedPassword = AES.decrypt(user.password, secretKey).toString(
    enc.Utf8
  );

  if (decryptedPassword !== payload.password) {
    const error: ErrorHandler = new Error('NOT-USER-VALID');
    error.statusCode = 400;

    throw error;
  }

  const token = generateToken(user.id);

  return {
    user: user.id,
    token,
  };
};

export const signup = async (payload: UserInput) => {
  const encryptedPass = AES.encrypt(payload.password, secretKey);

  const encryptedPayload = {
    ...payload,
    password: encryptedPass.toString(),
  };

  const userCreated = await userDal.create(encryptedPayload);

  return {
    user: userCreated.id,
  };
};
