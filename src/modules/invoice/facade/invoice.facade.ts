import UsecaseInterface from '../../@shared/usecase/usecase.interface';
import FindInvoiceUsecase from '../usecase/find-invoice/find-invoice.usecase';
import GenerateInvoiceUsecase from '../usecase/generate-invoice/generate-invoice.usecase';
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from './invoice.facade.interface';

export interface UsecaseProps {
  findInvoiceUsecase: FindInvoiceUsecase;
  generateInvoiceUsecase: GenerateInvoiceUsecase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findInvoiceUsecase: FindInvoiceUsecase;
  private _generateInvoiceUsecase: GenerateInvoiceUsecase;

  constructor(private usecaseProps: UsecaseProps) {
    this._findInvoiceUsecase = usecaseProps.findInvoiceUsecase;
    this._generateInvoiceUsecase = usecaseProps.generateInvoiceUsecase;
  }

  async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._findInvoiceUsecase.execute(input);
  }

  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateInvoiceUsecase.execute(input);
  }
}
