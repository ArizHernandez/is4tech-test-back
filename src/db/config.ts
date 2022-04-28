/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config } from 'dotenv';
import { Sequelize, SyncOptions } from 'sequelize';

config();
const database: string = process.env.DB_NAME!;
const user: string = process.env.DB_USER!;
const host: string = process.env.DB_HOST!;
const password: string = process.env.DB_PASSWORD!;

export const sequelize = new Sequelize(database, user, password, {
  dialect: 'mysql',
  host,
});

export const authenticateCN = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(`DB Error ${error}`);
  }
};

export const syncDB = async (options?: SyncOptions) => {
  try {
    await sequelize.sync(options);
  } catch (error) {
    console.log(`Error Sync DB ${error}`);
  }
};
