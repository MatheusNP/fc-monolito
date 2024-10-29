import { Sequelize } from 'sequelize-typescript';
import InvoiceModel from '../repository/invoice.model';
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';

describe('Product Adm Facade unit test', () => {
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

    const facade = InvoiceFacadeFactory.create();

    const result = await facade.find({ id: '1' });

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

  it('should generate an invoice', async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      id: '1',
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

    await facade.generate(input);

    const invoiceResult = await InvoiceModel.findAll({});

    const invoiceDb = invoiceResult[0].get({ plain: true });

    expect(invoiceDb).toBeDefined();
  });
});
