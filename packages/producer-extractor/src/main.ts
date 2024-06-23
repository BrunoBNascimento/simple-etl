import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
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
        groupId: 'consumer-group',
      },
    },
  });

  app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
