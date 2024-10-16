import UsecaseInterface from '../../@shared/usecase/usecase.interface';
import PaymentFacadeInterface, {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from './facade.interface';

export default class PaymentFacade implements PaymentFacadeInterface {
  private _processPayment: UsecaseInterface;

  constructor(private processPayment: UsecaseInterface) {
    this._processPayment = processPayment;
  }

  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this._processPayment.execute(input);
  }
}
