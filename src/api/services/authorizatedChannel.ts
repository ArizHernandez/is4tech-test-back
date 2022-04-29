import * as authorizatedChannelDal from '../../db/dal/authorizatedChannel';
import { AuthorizatedChannelInput } from '../../db/dto/authorizatedChannel';

export const getAll = () => {
  return authorizatedChannelDal.getAll();
};

export const getById = (id: string) => {
  return authorizatedChannelDal.getById(id);
};

export const create = (payload: AuthorizatedChannelInput) => {
  return authorizatedChannelDal.create(payload);
};

export const update = (id: string, payload: AuthorizatedChannelInput) => {
  return authorizatedChannelDal.update(id, payload);
};

export const deleteById = (id: string) => {
  return authorizatedChannelDal.deletById(id);
};
