import Distributors from '../models/distributor';
import Product from '../models/product';

import { ErrorHandler } from '../../api/helpers/errorHandler';
import { ProductInput } from '../dto/product';

export const getAll = () => {
  return Product.findAll({ order: [['id', 'DESC']] });
};

export const getById = async (id: string) => {
  const item = await Product.findByPk(id);

  if (!item) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  return item;
};

export const create = async (payload: ProductInput) => {
  const distributorExist = await Distributors.findByPk(payload.distributor_id);

  if (!distributorExist) {
    const error: ErrorHandler = new Error('DISTRIBUTOR-NOT-EXIST');
    error.statusCode = 404;

    throw error;
  }

  const result = await Product.create(payload);
  return result;
};

export const update = async (id: string, payload: ProductInput) => {
  const [distributorExist, item] = await Promise.all([
    Distributors.findByPk(payload.distributor_id),
    Product.findByPk(id),
  ]);

  if (!item) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  if (!distributorExist) {
    const error: ErrorHandler = new Error('DISTRIBUTOR-NOT-EXIST');
    error.statusCode = 404;

    throw error;
  }

  const result = await item.update(payload);
  return result;
};

export const deletById = async (id: string) => {
  const item = await Product.findByPk(id);

  if (!item) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  await item.destroy();
  return item;
};
