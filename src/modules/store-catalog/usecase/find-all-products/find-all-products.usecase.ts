import UsecaseInterface from '../../../@shared/usecase/usecase.interface';
import ProductGateway from '../../gateway/product.gateway';

export default class FindAllProductsUsecase implements UsecaseInterface {
  constructor(private productReopsitory: ProductGateway) {}

  async execute(): Promise<any> {
    const products = await this.productReopsitory.findAll();

    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
