import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from './client.model';
import ClientRepository from './client.repository';
import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client.entity';

describe('Client Repository unit test', () => {
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

  it('should create a client', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'client1@me.com',
      address: 'Client 1 Address',
    });
    const clientRepository = new ClientRepository();
    await clientRepository.add(client);

    const clientResult = await ClientModel.findOne({ where: { id: '1' } });

    const clientDb = clientResult.get({ plain: true });

    expect(clientDb.id).toEqual(client.id.id);
    expect(clientDb.name).toEqual(client.name);
    expect(clientDb.email).toEqual(client.email);
    expect(clientDb.address).toEqual(client.address);
    expect(clientDb.createdAt).toEqual(client.createdAt);
    expect(clientDb.updatedAt).toEqual(client.updatedAt);
  });

  it('should find a client', async () => {
    const clientResult = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: 'client1@me.com',
      address: 'Client 1 Address',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const client: ClientModel = clientResult.get({ plain: true });

    const clientRepository = new ClientRepository();

    const result = await clientRepository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
