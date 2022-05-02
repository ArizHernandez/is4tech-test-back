import { RequestHandler } from 'express';

import * as service from '../services/distributor';
import { DistributorsInput } from '../../db/dto/distributor';

export const get: RequestHandler = async (_, res, next) => {
  try {
    const products = await service.getAll();

    res.status(200).json({
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const payload: DistributorsInput = {
    code: req.body.code,
    email_alert: req.body.email_alert,
    email_notificate: req.body.email_notificate,
    name: req.body.name,
  };

  try {
    const products = await service.create(payload);

    res.status(201).json({
      message: 'CREATED-SUCCESS',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const payload: DistributorsInput = {
    code: req.body.code,
    email_alert: req.body.email_alert,
    email_notificate: req.body.email_notificate,
    name: req.body.name,
  };

  try {
    const updatedProduct = await service.update(id, payload);

    res.status(200).json({
      message: 'PUT-SUCCESS',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await service.deleteById(id);

    res.status(200).json({
      message: 'DELETE-SUCCESS',
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await service.getById(id);

    res.status(200).json({
      message: 'FIND-ID-SUCCCESS',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
