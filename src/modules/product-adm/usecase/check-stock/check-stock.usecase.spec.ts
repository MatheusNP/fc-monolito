import Id from '../../../@shared/domain/value-object/id.value-object';
import CheckStockUsecase from './check-stock.usecase';

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue({
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
    }),
  };
};

describe('Check stock Usecase unit test', () => {
  it('should check stock', async () => {
    const productRepository = MockRepository();
    const usecase = new CheckStockUsecase(productRepository);

    const input = {
      productId: '1',
    };

    const result = await usecase.execute(input);

    expect(productRepository.find).toHaveBeenCalled();
    expect(result.productId).toBe(input.productId);
    expect(result.stock).toBe(10);
  });
});
