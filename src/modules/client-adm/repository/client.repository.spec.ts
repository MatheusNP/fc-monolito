import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from './client.model';
import ClientRepository from './client.repository';

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
