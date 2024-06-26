import { Inject, Injectable } from '@nestjs/common';
import BaseStrategy from './base.strategy';
import * as path from 'path';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { PassThrough } from 'stream';
import { ClientKafka } from '@nestjs/microservices';
import { createKafkaTopicObject } from 'src/factories/kafka-topic.factory';

@Injectable()
export class FileStrategy implements BaseStrategy {
  constructor(
    @Inject('PRODUCER_SERVICE') private readonly producer: ClientKafka,
  ) {}

  private productsStream: fs.ReadStream;
  private stockStream: fs.ReadStream;
  private middleProductsStream = new PassThrough({ objectMode: true });
  private middleStockStream = new PassThrough({ objectMode: true });
  private tenant: string;

  private setTenant(tenant: string) {
    this.tenant = tenant;
  }

  fetch() {
    const products = path.join(process.cwd(), 'src', 'files', 'produtos.csv');
    const stock = path.join(process.cwd(), 'src', 'files', 'estoque.csv');

    this.productsStream = fs.createReadStream(products);
    this.stockStream = fs.createReadStream(stock);

    return this;
  }

  process() {
    this.productsStream
      .pipe(csv({ separator: ';' }))
      .pipe(this.middleProductsStream);

    this.stockStream.pipe(csv({ separator: ';' })).pipe(this.middleStockStream);
    return this;
  }

  send() {
    this.middleProductsStream.on('data', async (data) => {
      const message = createKafkaTopicObject(data, 'files', this.tenant);

      await this.producer.emit('produtos_raw', message);
    });

    this.middleStockStream.on('data', async (data) => {
      const message = createKafkaTopicObject(data, 'files', this.tenant);

      await this.producer.emit('estoque_raw', message);
    });
  }

  execute(tenant: string) {
    this.setTenant(tenant);
    this.fetch().process().send();
  }
}
