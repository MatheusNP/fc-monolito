import ClientGateway from '../../gateway/client.gateway';
import { FindClientInputDto, FindClientOutputDto } from './find-client.usecase.dto';

export default class FindClientUsecase {
  private readonly _clientRepository: ClientGateway;

  constructor(private readonly clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this._clientRepository.find(input.id);

    return {
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
    };
  }
}
