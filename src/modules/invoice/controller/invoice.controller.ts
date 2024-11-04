import express, { Request, Response } from 'express';
import FindInvoiceUsecase from '../../invoice/usecase/find-invoice/find-invoice.usecase';
import InvoiceRepository from '../../invoice/repository/invoice.repository';

export const invoiceRoute = express.Router();

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
  const repository = new InvoiceRepository();
  const usecase = new FindInvoiceUsecase(repository);

  try {
    const output = await usecase.execute({ id: req.params.id });

    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
