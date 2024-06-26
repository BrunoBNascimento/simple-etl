import { Injectable, OnModuleInit } from '@nestjs/common';
import { KsqlRestService } from 'src/services/ksqlDB.service';

@Injectable()
export class TransformerProvider implements OnModuleInit {
  constructor(private readonly ksqlRestService: KsqlRestService) {}

  async onModuleInit() {
    const query = 'SELECT * FROM produtos limit 10;';
    const queryStock = 'SELECT * FROM estoque limit 10;';
    const queryResult = this.ksqlRestService.queryKsqlDb(query);
    const queryResultStock = this.ksqlRestService.queryKsqlDb(queryStock);

    console.log(queryResult);

    queryResult.subscribe((response) => {
      response.data.on('data', (chunk) => {
        console.log(chunk.toString());
      });
    });

    queryResultStock.subscribe((response) => {
      response.data.on('data', (chunk) => {
        console.log(chunk.toString());
      });
    });
  }
}
