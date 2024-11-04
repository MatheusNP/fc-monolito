import express, { Request, Response } from 'express';
import ProductRepository from '../repository/product.repository';
import AddProductUseCase from '../usecase/add-product/add-product.usecase';

export const productAdmRoute = express.Router();

productAdmRoute.post('/', async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const usecase = new AddProductUseCase(productRepository);

  try {
    const input = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const output = await usecase.execute(input);

    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
