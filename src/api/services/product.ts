import * as productsDal from '../../db/dal/product';
import { ProductInput } from '../../db/dto/product';

export const getAll = () => {
  return productsDal.getAll();
};

export const getById = (id: string) => {
  return productsDal.getById(id);
};

export const create = (payload: ProductInput) => {
  return productsDal.create(payload);
};

export const update = (id: string, payload: ProductInput) => {
  return productsDal.update(id, payload);
};

export const deleteById = (id: string) => {
  return productsDal.deletById(id);
};
