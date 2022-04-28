import Distributor from '../models/distributor';

import { DistributorsInput } from '../dto/distributor';
import { ErrorHandler } from '../../api/helpers/errorHandler';

export const getAll = () => {
  return Distributor.findAll();
};

export const getById = async (id: string) => {
  const item = await Distributor.findByPk(id);

  if (!item) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  return item;
};

export const create = async (payload: DistributorsInput) => {
  const result = await Distributor.create(payload);
  return result;
};

export const update = async (id: string, payload: DistributorsInput) => {
  const item = await Distributor.findByPk(id);

  if (!item) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  const result = await item.update(payload);
  return result;
};

export const deletById = async (id: string) => {
  const item = await Distributor.findByPk(id);

  if (!item) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  await item.destroy();
  return true;
};
