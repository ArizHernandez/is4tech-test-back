import { RequestHandler } from 'express';

import * as service from '../services/authorizatedChannel';
import { AuthorizatedChannelInput } from '../../db/dto/authorizatedChannel';

export const get: RequestHandler = async (_, res, next) => {
  try {
    const authorizatedItems = await service.getAll();

    res.status(200).json({
      data: authorizatedItems,
    });
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const payload: AuthorizatedChannelInput = {
    distributor_id: req.body.distributor_id,
    code: req.body.code,
    name: req.body.name,
  };

  try {
    const authorizatedCreated = await service.create(payload);

    res.status(201).json({
      message: 'CREATED-SUCCESS',
      data: authorizatedCreated,
    });
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const payload: AuthorizatedChannelInput = {
    distributor_id: req.body.distributor_id,
    code: req.body.code,
    name: req.body.name,
  };

  try {
    const authorizatedUpdated = await service.update(id, payload);

    res.status(200).json({
      message: 'PUT-SUCCESS',
      data: authorizatedUpdated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const authorizatedDeleted = await service.deleteById(id);

    res.status(200).json({
      message: 'DELETE-SUCCESS',
      data: authorizatedDeleted,
    });
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const authorizatedItem = await service.getById(id);

    res.status(200).json({
      message: 'FIND-ID-SUCCCESS',
      data: authorizatedItem,
    });
  } catch (error) {
    next(error);
  }
};
