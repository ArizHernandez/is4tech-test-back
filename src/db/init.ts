import AuthorizatedChannel from './models/authorizatedChannel';
import Distributors from './models/distributor';
import Product from './models/product';
import User from './models/user';
import { authenticateCN, syncDB } from './config';

const associations = () => {
  Distributors.hasMany(Product, {
    foreignKey: 'distributor_id',
    as: 'product',
  });
  Product.belongsTo(Distributors, {
    foreignKey: 'distributor_id',
    as: 'distributor',
  });

  Distributors.hasMany(AuthorizatedChannel, {
    foreignKey: 'distributor_id',
    as: 'authorizated_channels',
  });
  AuthorizatedChannel.belongsTo(Distributors, {
    foreignKey: 'distributor_id',
    as: 'distributor',
  });
};

const dbInit = async () => {
  const isDev = process.env.NODE_ENV === 'development';

  associations();
  
  await User.sync();
  await syncDB({ alter: isDev });
  await authenticateCN();
};

export default dbInit;
