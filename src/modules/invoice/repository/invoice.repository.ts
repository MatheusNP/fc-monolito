import Address from '../../@shared/domain/value-object/address.value-object';
import Id from '../../@shared/domain/value-object/id.value-object';
import InvoiceItem from '../domain/invoice-item.entity';
import Invoice from '../domain/invoice.entity';
import InvoiceGateway from '../gateway/invoice.gateway';
import InvoiceModel from './invoice.model';

export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<Invoice> {
    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
      items: input.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
        };
      }),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    return new Invoice({
      id: input.id,
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }

  async find(id: string): Promise<Invoice> {
    const invoiceResult = await InvoiceModel.findOne({ where: { id } });

    if (!invoiceResult) throw new Error('Invoice not found');

    const invoice = invoiceResult.get({ plain: true });

    const response = new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipCode
      ),
      items: invoice.items.map((item: any) => {
        return new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        });
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
    return response;
  }
}
