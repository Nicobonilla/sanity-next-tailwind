import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Order } from './order';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING
  })
  name!: string

  @Column({
    type: DataType.STRING
  })
  email!: string;

 @Column({
     type: DataType.STRING
   })
  password!: string;

  @HasMany(() => Order)
  orders!: Order[];
}