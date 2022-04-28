import { Optional } from 'sequelize';

export interface Product {
  id: number;
  code: string;
  description?: string;
  amount: number;
}

export interface ProductInput extends Optional<Product, 'id' | 'description'> {
  distributor_id: number;
}
