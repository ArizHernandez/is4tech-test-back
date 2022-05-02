import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config';
import { User as UserAttributes, UserInput } from '../dto/user';

export default class User extends Model<UserAttributes, UserInput> {
  public id!: string;

  public user!: string;

  public password!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING(125),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(125),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'user',
  }
);
