import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config';

import {
  AuthorizatedChannel as AuthorizatedChannelAttributes,
  AuthorizatedChannelInput,
} from '../dto/authorizatedChannel';

export default class AuthorizatedChannel extends Model<
  AuthorizatedChannelAttributes,
  AuthorizatedChannelInput
> {
  public id!: string;

  public code!: string;

  public name!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

AuthorizatedChannel.init(
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
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "authorizated_channels"
  }
);
