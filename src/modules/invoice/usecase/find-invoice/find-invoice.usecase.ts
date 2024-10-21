import InvoiceGateway from '../../gateway/invoice.gateway';
import { FindInvoiceInputDTO, FindInvoiceOutputDTO } from './find-invoice.dto';

export default class FindInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: FindInvoiceInputDTO): Promise<FindInvoiceOutputDTO> {
    const invoice = await this._invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
        };
      }),
      total: invoice.items.reduce((total, item) => total + item.price, 0),
      createdAt: invoice.createdAt,
    };
  }
}
