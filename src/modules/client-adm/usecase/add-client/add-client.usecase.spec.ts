import AddClientUsecase from './add-client.usecase';

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe('Add Client Usecase unit test', () => {
  it('should add a client', async () => {
    const repository = MockRepository();

    const usecase = new AddClientUsecase(repository);

    const input = {
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

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.email).toEqual(input.email);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
  });
});
