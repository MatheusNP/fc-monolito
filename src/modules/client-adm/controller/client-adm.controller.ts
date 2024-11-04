import express, { Request, Response } from 'express';
import ClientRepository from '../repository/client.repository';
import AddClientUseCase from '../usecase/add-client/add-client.usecase';

export const clientAdmRoute = express.Router();

clientAdmRoute.post('/', async (req: Request, res: Response) => {
  const clientRepository = new ClientRepository();
  const usecase = new AddClientUseCase(clientRepository);

  try {
    const input = {
      id: req.body.id,
      name: req.body.name,
      document: req.body.document,
      email: req.body.email,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };

    const output = await usecase.execute(input);

    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
