import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileStrategy } from 'src/strategies/file.strategy';

@Injectable()
export class ExtractorService implements OnModuleInit {
  constructor(private readonly fileStrategy: FileStrategy) {}

  async onModuleInit() {
    console.log('Starting extractor service...');
  }

  hello(tenant: string): any {
    this.fileStrategy.execute(tenant);
  }
}
