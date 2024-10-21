import Address from '../../../@shared/domain/value-object/address.value-object';
import Id from '../../../@shared/domain/value-object/id.value-object';
import GenerateInvoiceUseCase from './generate-invoice.usecase';

const MockRepository = () => {
  return {
    generate: jest.fn().mockReturnValue({
      id: new Id('1'),
      name: 'Invoice 1',
      document: 'Document 1',
      address: new Address(
        'Street 1',
        'Number 1',
        'Complement 1',
        'City 1',
        'State 1',
        'ZipCode 1'
      ),
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
        },
      ],
    }),
    find: jest.fn(),
  };
};

describe('GenerateInvoice UseCase unit test', () => {
  it('should generate a invoice', async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);

    const input = {
      name: 'Invoice 1',
      document: 'Document 1',
      street: 'Street 1',
      number: 'Number 1',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: 'ZipCode 1',
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe('Invoice 1');
    expect(result.document).toBe('Document 1');
    expect(result.street).toBe('Street 1');
    expect(result.number).toBe('Number 1');
    expect(result.complement).toBe('Complement 1');
    expect(result.city).toBe('City 1');
    expect(result.state).toBe('State 1');
    expect(result.zipCode).toBe('ZipCode 1');
    expect(result.items[0]).toBeDefined();
    expect(result.items[0].id).toBe('1');
    expect(result.items[0].name).toBe('Product 1');
    expect(result.items[0].price).toBe(100);
  });
});
