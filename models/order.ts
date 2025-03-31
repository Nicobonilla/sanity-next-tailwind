import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './user';
import { Product } from './product';

@Table
export class Order extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING
  })
  userId!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER
  })
  productId!: number;

  @Column({
    type: DataType.INTEGER
  })
  quantity!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Product)
  product!: Product;
}