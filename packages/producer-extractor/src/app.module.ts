import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtractorService } from './extractor/extractor.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExtractorController } from './extractor/extractor.controller';
import { FileStrategy } from './strategies/file.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'extractor',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'extractor-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController, ExtractorController],
  providers: [AppService, ExtractorService, FileStrategy],
})
export class AppModule {}
