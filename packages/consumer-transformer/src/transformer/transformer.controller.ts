import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  Payload,
  Transport,
} from '@nestjs/microservices';

@Controller('transformer')
export class TransformerController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'transformer',
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'produtos_raw',
      },
    },
  })
  client: ClientKafka;

  @EventPattern('produtos_raw')
  async handleProdutos(@Payload() data: any) {
    console.log(data);
  }
}
