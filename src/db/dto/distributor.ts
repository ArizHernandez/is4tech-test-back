import { Optional, } from 'sequelize';

export interface Distributors {
  id: number;
  name: string;
  code: string;
  email_notificate: string;
  email_alert: number;
}

export type DistributorsInput = Optional<Distributors, 'id'>;
