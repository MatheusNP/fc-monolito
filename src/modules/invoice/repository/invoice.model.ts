import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'invoices',
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: false })
  complement: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  zipCode: string;

  @Column({
    type: 'JSON',
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('items');
      return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
    },
    set(value: InvoiceItem[]) {
      this.setDataValue('items', JSON.stringify(value));
    },
  })
  items: InvoiceItem[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;
}

class InvoiceItem {
  id: string;
  name: string;
  price: number;
}
