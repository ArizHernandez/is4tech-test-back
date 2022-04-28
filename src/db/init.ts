import Distributors from './models/distributor';
import Product from './models/product';
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
};

const dbInit = async () => {
  const isDev = process.env.NODE_ENV === 'development';
  const resetDB = isDev && Boolean(process.env.DB_RESET);

  associations();

  await syncDB({ alter: isDev, force: resetDB });
  await authenticateCN();
};

export default dbInit;
