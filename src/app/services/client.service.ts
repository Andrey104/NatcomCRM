import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Client} from '../models/client';
import {BaseApi} from '../core/base-api';


@Injectable()
export class ClientService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getClient(clientId: number): Observable<Client> {
    return this.get(`clients/${clientId}`);
  }

  addClient(clientName: string, clientPhone: string): Observable<Client> {
    const data = {
      fio: clientName,
      phones: [{
        number: clientPhone
      },
        {
          number: '21312312'
        }]
    };
    return this.post(`clients/`, data);
  }
}
