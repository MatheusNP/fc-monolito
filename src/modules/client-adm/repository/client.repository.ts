import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client.entity';
import ClientGateway from '../gateway/client.gateway';
import { ClientModel } from './client.model';

export default class ClientRepository implements ClientGateway {
  add(client: Client): Promise<void> {
    throw new Error('Method not implemented.');
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
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
