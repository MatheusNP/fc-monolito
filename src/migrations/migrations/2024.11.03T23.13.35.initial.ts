import type { MigrationFn } from 'umzug';
import { DataType, Sequelize } from 'sequelize-typescript';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('products', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    purchasePrice: {
      field: 'purchase_price',
      type: DataType.NUMBER,
      allowNull: true,
    },
    stock: {
      type: DataType.NUMBER,
      allowNull: true,
    },
    salePrice: {
      field: 'sale_price',
      type: DataType.NUMBER,
      allowNull: true,
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

  await sequelize.getQueryInterface().createTable('invoices', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    document: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    number: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    complement: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    zipCode: {
      field: 'zip_code',
      type: DataType.STRING(255),
      allowNull: false,
    },
    items: {
      type: DataType.JSON,
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

  await sequelize.getQueryInterface().createTable('clients', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    document: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    number: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    complement: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    zipCode: {
      field: 'zip_code',
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
  await sequelize.getQueryInterface().dropTable('products');
  await sequelize.getQueryInterface().dropTable('invoices');
  await sequelize.getQueryInterface().dropTable('clients');
};
