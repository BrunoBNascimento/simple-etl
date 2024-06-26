import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class KsqlRestService {
  constructor(private readonly httpService: HttpService) {}

  queryKsqlDb(query: string): Observable<AxiosResponse<any>> {
    const endpoint = 'http://localhost:8088/query';
    const body = { ksql: query };
    console.log('calling query: ', query, body);

    return this.httpService.post(endpoint, body, {
      responseType: 'stream',
    });
  }
}
