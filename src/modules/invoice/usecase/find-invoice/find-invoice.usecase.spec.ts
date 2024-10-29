import Address from '../../../@shared/domain/value-object/address.value-object';
import Id from '../../../@shared/domain/value-object/id.value-object';
import FindInvoiceUseCase from './find-invoice.usecase';

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue({
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
          id: new Id('a'),
          name: 'Product 1',
          price: 100,
        },
      ],
    }),
  };
};

describe('FindInvoice UseCase unit test', () => {
  it('should find a invoice', async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: '1',
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe('1');
    expect(result.name).toBe('Invoice 1');
    expect(result.document).toBe('Document 1');
    expect(result.address.street).toBe('Street 1');
    expect(result.address.number).toBe('Number 1');
    expect(result.address.complement).toBe('Complement 1');
    expect(result.address.city).toBe('City 1');
    expect(result.address.state).toBe('State 1');
    expect(result.address.zipCode).toBe('ZipCode 1');
    expect(result.items[0]).toBeDefined();
    expect(result.items[0].id).toBe('a');
    expect(result.items[0].name).toBe('Product 1');
    expect(result.items[0].price).toBe(100);
    expect(result.total).toBe(100);
  });
});
