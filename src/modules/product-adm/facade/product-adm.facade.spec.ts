import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../repository/product.model';
import ProductRepository from '../repository/product.repository';
import AddProductUseCase from '../usecase/add-product/add-product.usecase';
import ProductAdmFacade from './product-adm.facade';
import ProductAdmFacadeFactory from '../factory/facade.factory';

describe('Product Adm Facade unit test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should add a product', async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: '1' }, raw: true });

    expect(product.id).toEqual(input.id);
    expect(product.name).toEqual(input.name);
    expect(product.description).toEqual(input.description);
    expect(product.purchasePrice).toEqual(input.purchasePrice);
    expect(product.stock).toEqual(input.stock);
  });

  it('should check stock', async () => {
    ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const productFacade = ProductAdmFacadeFactory.create();

    const result = await productFacade.checkStock({
      productId: '1',
    });

    expect(result.productId).toBe('1');
    expect(result.stock).toBe(10);
  });
});
