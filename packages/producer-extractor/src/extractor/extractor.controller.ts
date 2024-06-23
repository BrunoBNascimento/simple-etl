import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ExtractorService } from './extractor.service';

@Controller('extractor')
export class ExtractorController {
  constructor(
    @Inject(ExtractorService)
    private readonly extractorService: ExtractorService,
  ) {}

  @Get()
  async getHello(@Query('tenant') tenant: string) {
    await this.extractorService.hello(tenant);

    return {
      tenant,
      success: true,
    };
  }
}
