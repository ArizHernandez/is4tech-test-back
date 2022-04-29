import { Optional } from 'sequelize';

export interface User {
  id: number;
  user: string;
  password: string;
}

export type UserInput = Optional<User, 'id'>
