import express, { Request, Response } from 'express';
import PlaceOrderUsecase from '../usecase/place-order/place-order.usecase';
import ClientAdmFacadeFactory from '../../client-adm/factory/client-adm.facade.factory';
import ProductAdmFacadeFactory from '../../product-adm/factory/facade.factory';
import StoreCatalogFacadeFactory from '../../store-catalog/factory/facade.factory';
import CheckoutRepository from '../repository/order.repository';
import InvoiceFacadeFactory from '../../invoice/factory/invoice.facade.factory';
import PaymentFacadeFactory from '../../payment/factory/payment.facade.factory';

export const checkoutRoute = express.Router();

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new PlaceOrderUsecase(
    ClientAdmFacadeFactory.create(),
    ProductAdmFacadeFactory.create(),
    StoreCatalogFacadeFactory.create(),
    new CheckoutRepository(),
    InvoiceFacadeFactory.create(),
    PaymentFacadeFactory.create()
  );

  try {
    const input = {
      clientId: req.body.clientId,
      products: req.body.products.map((product: any) => ({
        productId: product.productId,
      })),
    };

    const output = await usecase.execute(input);

    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
