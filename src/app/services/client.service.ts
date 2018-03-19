import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Client} from '../models/client';
import {BaseApi} from '../core/base-api';
import {Phone} from '../models/phone';


@Injectable()
export class ClientService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getClient(clientId: number): Observable<Client> {
    return this.get(`clients/${clientId}`);
  }

  addClient(clientName: string, email: string, phones: Phone[]): Observable<Client> {
    const client = new Client();
    client.fio = clientName;
    client.email = email;
    client.phones = phones;
    return this.post(`clients/`, client);
  }
}
