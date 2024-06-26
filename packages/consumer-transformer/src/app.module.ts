import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformerProvider } from './transformer/transformer.provider';
import { KsqlRestService } from './services/ksqlDB.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, KsqlRestService, TransformerProvider],
})
export class AppModule {}
