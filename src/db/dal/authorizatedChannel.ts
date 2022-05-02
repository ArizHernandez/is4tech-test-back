/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthorizatedChannel from '../models/authorizatedChannel';
import Distributors from '../models/distributor';

import { AuthorizatedChannelInput } from '../dto/authorizatedChannel';
import { ErrorHandler } from '../../api/helpers/errorHandler';

export const getAll = () => {
  return AuthorizatedChannel.findAll({
    order: [['id', 'DESC']],
    include: [{ all: true }],
  });
};

export const getById = async (id: string) => {
  const item = await AuthorizatedChannel.findByPk(id, {
    include: [{ all: true }],
  });

  if (!item) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  return item;
};

export const create = async (payload: AuthorizatedChannelInput) => {
  const distributorExist = await Distributors.findByPk(payload.distributor_id);

  if (!distributorExist) {
    const error: ErrorHandler = new Error('DISTRIBUTOR-NOT-EXIST');
    error.statusCode = 404;

    throw error;
  }

  const result = await AuthorizatedChannel.create(payload);

  return { ...(result as any).dataValues, distributor: distributorExist };
};

export const update = async (id: string, payload: AuthorizatedChannelInput) => {
  const [distributorExist, item] = await Promise.all([
    Distributors.findByPk(payload.distributor_id),
    AuthorizatedChannel.findByPk(id),
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

  return { ...(result as any).dataValues, distributor: distributorExist };
};

export const deletById = async (id: string) => {
  const item = await AuthorizatedChannel.findByPk(id);

  if (!item) {
    const error: ErrorHandler = new Error('NOT-FOUND');
    error.statusCode = 404;

    throw error;
  }

  await item.destroy();
  return item;
};
