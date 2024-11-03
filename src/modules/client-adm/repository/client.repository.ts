import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client.entity';
import ClientGateway from '../gateway/client.gateway';
import { ClientModel } from './client.model';

export default class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      document: client.document,
      email: client.email,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }

  async find(id: string): Promise<Client> {
    const clientResult = await ClientModel.findOne({ where: { id } });

    if (!clientResult) {
      throw new Error('Client not found');
    }

    const client = clientResult.get({ plain: true });

    return new Client({
      id: new Id(client.id),
      name: client.name,
      document: client.document,
      email: client.email,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
