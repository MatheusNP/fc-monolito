import { app } from '../../../infrastructure/api/express';
import request from 'supertest';
import { Umzug } from 'umzug';
import { migrator } from '../../../migrations/config/migrator';
import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../repository/client.model';

describe('E2E test for Product routes', () => {
  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    });

    sequelize.addModels([ClientModel]);
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
    const response = await request(app).post('/clients').send({
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

    expect(response.status).toBe(201);
    expect(response.body.id).toBe('1');
    expect(response.body.name).toBe('Client 1');
    expect(response.body.document).toBe('12345678910');
    expect(response.body.email).toBe('clienta@me.com');
    expect(response.body.street).toBe('street a');
    expect(response.body.number).toBe('111');
    expect(response.body.complement).toBe('complement x');
    expect(response.body.city).toBe('some city');
    expect(response.body.state).toBe('some state');
    expect(response.body.zipCode).toBe('111');
  });
});
