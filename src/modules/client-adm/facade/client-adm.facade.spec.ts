import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../repository/client.model';
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';

describe('Client Adm Facade unit test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should add a client', async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: '1',
      name: 'Client 1',
      document: '1',
      email: 'client1@me.com',
      street: 'Client 1 Address',
      number: '1111',
      complement: '',
      city: 'some city',
      state: 'some state',
      zipCode: '111',
    };

    await facade.add(input);

    const clientResult = await ClientModel.findOne({ where: { id: '1' } });

    const clientDb = clientResult.get({ plain: true });

    expect(clientDb).toBeDefined();
    expect(clientDb.name).toEqual(input.name);
    expect(clientDb.document).toEqual(input.document);
    expect(clientDb.email).toEqual(input.email);
    expect(clientDb.street).toEqual(input.street);
    expect(clientDb.number).toEqual(input.number);
    expect(clientDb.complement).toEqual(input.complement);
    expect(clientDb.city).toEqual(input.city);
    expect(clientDb.state).toEqual(input.state);
    expect(clientDb.zipCode).toEqual(input.zipCode);
  });

  it('should find a client', async () => {
    const facade = ClientAdmFacadeFactory.create();

    const clientResult = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      document: 'Client 1',
      email: 'client1@me.com',
      street: 'Client 1 Address',
      number: '1111',
      complement: '',
      city: 'some city',
      state: 'some state',
      zipCode: '111',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const client = clientResult.get({ plain: true });

    const input = {
      id: '1',
    };

    const result = await facade.find(input);

    expect(result.id).toBe(client.id);
    expect(result.name).toBe(client.name);
    expect(result.document).toBe(client.document);
    expect(result.email).toBe(client.email);
    expect(result.street).toBe(client.street);
    expect(result.number).toBe(client.number);
    expect(result.complement).toBe(client.complement);
    expect(result.city).toBe(client.city);
    expect(result.state).toBe(client.state);
    expect(result.zipCode).toBe(client.zipCode);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });
});
