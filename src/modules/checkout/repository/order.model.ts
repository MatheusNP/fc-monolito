import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

class OrderClient {
  id: string;
  name: string;
  email: string;
  address: string;
}

class OrderProduct {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

@Table({
  tableName: 'orders',
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({
    type: 'JSON',
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('client');
      return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
    },
    set(value: OrderProduct[]) {
      this.setDataValue('client', JSON.stringify(value));
    },
  })
  client: OrderClient;

  @Column({
    type: 'JSON',
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('products');
      return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
    },
    set(value: OrderProduct[]) {
      this.setDataValue('products', JSON.stringify(value));
    },
  })
  products: OrderProduct[];

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;
}
