import { Optional } from 'sequelize';

export interface AuthorizatedChannel {
  id: number;
  code: string;
  name: string;
}

export interface AuthorizatedChannelInput
  extends Optional<AuthorizatedChannel, 'id'> {
  distributor_id: number;
}
