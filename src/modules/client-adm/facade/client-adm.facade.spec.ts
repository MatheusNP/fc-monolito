import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../repository/client.model';
import ClientRepository from '../repository/client.repository';
import AddClientUsecase from '../usecase/add-client/add-client.usecase';
import ClientAdmFacade from './client-adm.facade';
import FindClientUsecase from '../usecase/find-client/find-client.usecase';

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
    const repository = new ClientRepository();
    const addUsecase = new AddClientUsecase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: undefined,
    });

    const input = {
      id: '1',
      name: 'Client 1',
      email: 'client1@me.com',
      address: 'Client 1 Address',
    };

    await facade.add(input);

    const clientResult = await ClientModel.findOne({ where: { id: '1' } });

    const clientDb = clientResult.get({ plain: true });

    expect(clientDb).toBeDefined();
    expect(clientDb.name).toEqual(input.name);
    expect(clientDb.email).toEqual(input.email);
    expect(clientDb.address).toEqual(input.address);
  });

  it('should find a client', async () => {
    const repository = new ClientRepository();
    const findUsecase = new FindClientUsecase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: undefined,
      findUsecase: findUsecase,
    });

    const clientResult = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: 'client1@me.com',
      address: 'Client 1 Address',
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
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });
});
