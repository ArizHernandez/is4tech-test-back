import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config';
import {
  Distributors as DistributorsAttributes,
  DistributorsInput,
} from '../dto/distributors';

export default class Distributors extends Model<
  DistributorsAttributes,
  DistributorsInput
> {
  public id!: string;

  public code!: string;

  public name!: string;

  public email_notificate!: string;

  public email_alert!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Distributors.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_notificate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_alert: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "distributor"
  }
);
