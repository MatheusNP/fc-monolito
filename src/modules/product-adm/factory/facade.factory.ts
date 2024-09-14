import ProductAdmFacade from '../facade/product-adm.facade';
import ProductRepository from '../repository/product.repository';
import AddProductUseCase from '../usecase/add-product/add-product.usecase';

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUsecase = new AddProductUseCase(productRepository);
    // const checkStockUsecase = new CheckStockUseCase(productRepository);
    return new ProductAdmFacade({
      addUsecase: addProductUsecase,
      checkStockUsecase: undefined,
    });
  }
}
