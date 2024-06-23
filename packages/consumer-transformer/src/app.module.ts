import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformerController } from './transformer/transformer.controller';

@Module({
  imports: [],
  controllers: [AppController, TransformerController],
  providers: [AppService],
})
export class AppModule {}
