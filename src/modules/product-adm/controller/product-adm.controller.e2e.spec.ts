import { app } from '../../../infrastructure/api/express';
import request from 'supertest';
import { Umzug } from 'umzug';
import { migrator } from '../../../migrations/config/migrator';
import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../repository/product.model';

describe('E2E test for Product routes', () => {
  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });

    sequelize.addModels([ProductModel]);
    migration = migrator(sequelize);

    await migration.up();
  });

  afterEach(async () => {
    if (!migration || !sequelize) return;

    migration = migrator(sequelize);
    await migration.down();
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/products').send({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 70,
      stock: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBe('1');
    expect(response.body.name).toBe('Product 1');
    expect(response.body.description).toBe('Description 1');
    expect(response.body.purchasePrice).toBe(70);
    expect(response.body.stock).toBe(100);
  });
});
