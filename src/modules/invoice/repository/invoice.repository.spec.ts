import { Sequelize } from 'sequelize-typescript';
import InvoiceModel from './invoice.model';
import Invoice from '../domain/invoice.entity';
import Id from '../../@shared/domain/value-object/id.value-object';
import Address from '../../@shared/domain/value-object/address.value-object';
import InvoiceRepository from './invoice.repository';
import InvoiceItem from '../domain/invoice-item.entity';

describe('Invoice Repository unit test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should generate an invoice', async () => {
    const invoice = new Invoice({
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
        new InvoiceItem({
          id: new Id('a'),
          name: 'Product 1',
          price: 100,
        }),
      ],
    });
    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const invoiceResult = await InvoiceModel.findOne({ where: { id: '1' } });
    const invoiceDb = invoiceResult.get({ plain: true });

    expect(invoiceDb.id).toBe(invoice.id.id);
    expect(invoiceDb.name).toBe(invoice.name);
    expect(invoiceDb.document).toBe(invoice.document);
    expect(invoiceDb.street).toBe(invoice.address.street);
    expect(invoiceDb.number).toBe(invoice.address.number);
    expect(invoiceDb.complement).toBe(invoice.address.complement);
    expect(invoiceDb.city).toBe(invoice.address.city);
    expect(invoiceDb.state).toBe(invoice.address.state);
    expect(invoiceDb.zipCode).toBe(invoice.address.zipCode);
    expect(invoiceDb.items[0].id).toBe(invoice.items[0].id.id);
    expect(invoiceDb.items[0].name).toBe(invoice.items[0].name);
    expect(invoiceDb.items[0].price).toBe(invoice.items[0].price);
  });

  it('should find an invoice', async () => {
    await InvoiceModel.create({
      id: '1',
      name: 'Invoice 1',
      document: 'Document 1',
      street: 'Street 1',
      number: 'Number 1',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: 'ZipCode 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: 'a',
          name: 'Product 1',
          price: 100,
        },
      ],
    });

    const invoiceRepository = new InvoiceRepository();
    const invoice = await invoiceRepository.find('1');

    expect(invoice.id.id).toEqual('1');
    expect(invoice.name).toEqual('Invoice 1');
    expect(invoice.document).toEqual('Document 1');
    expect(invoice.address.street).toEqual('Street 1');
    expect(invoice.address.number).toEqual('Number 1');
    expect(invoice.address.complement).toEqual('Complement 1');
    expect(invoice.address.city).toEqual('City 1');
    expect(invoice.address.state).toEqual('State 1');
    expect(invoice.address.zipCode).toEqual('ZipCode 1');
    expect(invoice.items[0].id.id).toEqual('a');
    expect(invoice.items[0].name).toEqual('Product 1');
    expect(invoice.items[0].price).toEqual(100);
  });
});
