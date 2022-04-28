import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config';

import { Product as ProductAttributes, ProductInput } from '../dto/product';

export default class Product extends Model<ProductAttributes, ProductInput> {
  public id!: string;

  public code!: string;

  public description!: string;

  public amount!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    amount: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'product',
  }
);
