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

  private fileStream: fs.ReadStream;
  private middleStream = new PassThrough({ objectMode: true });
  private tenant: string;

  private setTenant(tenant: string) {
    this.tenant = tenant;
  }

  fetch() {
    const fileName = path.join(process.cwd(), 'src', 'files', 'produtos.csv');

    this.fileStream = fs.createReadStream(fileName);

    return this;
  }

  process() {
    this.fileStream.pipe(csv({ separator: ';' })).pipe(this.middleStream);
    return this;
  }

  send() {
    this.middleStream.on('data', async (data) => {
      const message = createKafkaTopicObject(data, 'files', this.tenant);

      await this.producer.emit('produtos_raw', message);
    });
  }

  execute(tenant: string) {
    this.setTenant(tenant);
    this.fetch().process().send();
  }
}
