import * as distributorsDal from '../../db/dal/distributor';
import { DistributorsInput } from '../../db/dto/distributor';

export const getAll = () => {
  return distributorsDal.getAll();
};

export const getById = (id: string) => {
  return distributorsDal.getById(id);
};

export const create = (payload: DistributorsInput) => {
  return distributorsDal.create(payload);
};

export const update = (id: string, payload: DistributorsInput) => {
  return distributorsDal.update(id, payload);
};

export const deleteById = (id: string) => {
  return distributorsDal.deletById(id);
};
