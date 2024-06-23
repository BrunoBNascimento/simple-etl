import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'consumer',
        brokers: ['localhost:29092'],
        retry: {
          retries: 3,
        },
      },
      consumer: {
        groupId: 'produtos_raw',
      },
    },
  });

  await app.listen();
}
bootstrap();
