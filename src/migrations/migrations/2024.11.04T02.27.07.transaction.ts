import type { MigrationFn } from 'umzug';
import { DataType, Sequelize } from 'sequelize-typescript';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('transactions', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
      field: 'order_id',
      type: DataType.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    status: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataType.DATE,
      allowNull: false,
    },
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('transactions');
};
