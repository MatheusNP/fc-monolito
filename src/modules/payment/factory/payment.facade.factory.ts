import PaymentFacade from '../facade/payment.facade';
import TransactionRepository from '../repository/transaction.repository';
import ProcessPaymentUsecase from '../usecase/process-payment/process-payment.usecase';

export default class PaymentFacadeFactory {
  static create() {
    const transactionRepository = new TransactionRepository();
    const processPaymentUsecase = new ProcessPaymentUsecase(transactionRepository);
    return new PaymentFacade(processPaymentUsecase);
  }
}
