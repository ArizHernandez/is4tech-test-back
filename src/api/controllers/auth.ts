import { RequestHandler } from 'express';

import * as service from '../services/auth';
import { UserInput } from '../../db/dto/user';

export const login: RequestHandler = async (req, res, next) => {
  const payload: UserInput = {
    user: req.body.user,
    password: req.body.password,
  };

  try {
    const user = await service.login(payload);

    res.status(201).json({
      message: 'LOGIN_SUCCESS',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  const payload: UserInput = {
    user: req.body.user,
    password: req.body.password,
  };

  try {
    const user = await service.signup(payload);

    res.status(201).json({
      message: 'CREATED_SUCCESS',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
