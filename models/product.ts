import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Product extends Model {

  @Column({
    type: DataType.STRING
  })
  name!: string;


  @Column({
    type: DataType.INTEGER
  })
  price!: number;


  @Column({
    type: DataType.INTEGER
  })
  stock!: number;

}