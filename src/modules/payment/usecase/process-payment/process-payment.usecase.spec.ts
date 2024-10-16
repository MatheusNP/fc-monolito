import Id from '../../../@shared/domain/value-object/id.value-object';
import Transaction from '../../domain/transaction';
import ProcessPaymentUsecase from './process-payment.usecase';

const transaction = new Transaction({
  id: new Id('1'),
  orderId: '1',
  amount: 100,
  status: 'approved',
});

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
};

const transactionDeclined = new Transaction({
  id: new Id('2'),
  orderId: '2',
  amount: 50,
  status: 'declined',
});

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
  };
};

describe('Process Payment Usecase', () => {
  it('should process a payment', async () => {
    const transactionRepository = MockRepository();
    const usecase = new ProcessPaymentUsecase(transactionRepository);

    const input = {
      orderId: '1',
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(transactionRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(transaction.id.id);
    expect(result.orderId).toBe('1');
    expect(result.amount).toBe(100);
    expect(result.status).toBe('approved');
    expect(result.createdAt).toStrictEqual(transaction.createdAt);
    expect(result.updatedAt).toStrictEqual(transaction.updatedAt);
  });

  it('should decline a payment', async () => {
    const transactionRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUsecase(transactionRepository);

    const input = {
      orderId: '2',
      amount: 50,
    };

    const result = await usecase.execute(input);

    expect(transactionRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(transactionDeclined.id.id);
    expect(result.orderId).toBe('2');
    expect(result.amount).toBe(50);
    expect(result.status).toBe('declined');
    expect(result.createdAt).toStrictEqual(transactionDeclined.createdAt);
    expect(result.updatedAt).toStrictEqual(transactionDeclined.updatedAt);
  });
});
