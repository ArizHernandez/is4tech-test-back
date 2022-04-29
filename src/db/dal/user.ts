import User from '../models/user';

import { UserInput } from '../dto/user';

export const getByUser = (user: string) => {
  return User.findOne({ where: { user } });
};

export const create = async (payload: UserInput) => {
  const result = await User.create(payload);

  return result;
};

// export const update = async (id: string, payload: UserInput) => {
//   const [distributorExist, item] = await Promise.all([
//     User.findByPk(payload.distributor_id),
//     User.findByPk(id),
//   ]);

//   if (!item) {
//     const error: ErrorHandler = new Error('NOT-FOUND');
//     error.statusCode = 404;

//     throw error;
//   }

//   if (!distributorExist) {
//     const error: ErrorHandler = new Error('DISTRIBUTOR-NOT-EXIST');
//     error.statusCode = 404;

//     throw error;
//   }

//   const result = await item.update(payload);
//   return result;
// };
