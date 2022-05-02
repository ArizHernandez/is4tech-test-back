import { RequestHandler } from 'express';

import * as service from '../services/product';
import { ProductInput } from '../../db/dto/product';

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
  const payload: ProductInput = {
    distributor_id: req.body.distributor_id,
    code: req.body.code,
    description: req.body.description,
    amount: req.body.amount,
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
  const payload: ProductInput = {
    distributor_id: req.body.distributor_id,
    code: req.body.code,
    description: req.body.code,
    amount: req.body.amount,
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
