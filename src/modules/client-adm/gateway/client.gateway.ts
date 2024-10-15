import Client from '../domain/client.entity';

export default interface ClientGateway {
  add(input: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
