import { app } from '../../../infrastructure/api/express';
import request from 'supertest';
import { Umzug } from 'umzug';
import { migrator } from '../../../migrations/config/migrator';
import { Sequelize } from 'sequelize-typescript';
import { ProductModel as ProductAdmModel } from '../../product-adm/repository/product.model';
import { ClientModel } from '../../client-adm/repository/client.model';
import { OrderModel } from '../repository/order.model';
import ProductModel from '../../store-catalog/repository/product.model';
import TransactionModel from '../../payment/repository/transaction.model';
import InvoiceModel from '../../invoice/repository/invoice.model';

describe('E2E test for Checkout routes', () => {
  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });

    sequelize.addModels([
      ProductAdmModel,
      ClientModel,
      OrderModel,
      TransactionModel,
      ProductModel,
      InvoiceModel,
    ]);
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
    await request(app).post('/clients').send({
      id: '1',
      name: 'Client 1',
      document: '12345678910',
      email: 'clienta@me.com',
      street: 'street a',
      number: '111',
      complement: 'complement x',
      city: 'some city',
      state: 'some state',
      zipCode: '111',
    });

    await request(app).post('/products').send({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 70,
      stock: 100,
    });

    await request(app).post('/products').send({
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      purchasePrice: 10,
      stock: 20,
    });

    await ProductModel.update({ salesPrice: 110 }, { where: { id: '1' } });

    const response = await request(app)
      .post('/checkout')
      .send({
        clientId: '1',
        products: [{ productId: '1' }, { productId: '2' }],
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.status).toBe('approved');
    expect(response.body.total).toBe(110);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0]).toEqual({
      productId: '1',
    });
    expect(response.body.products[1]).toEqual({
      productId: '2',
    });
  });
});
