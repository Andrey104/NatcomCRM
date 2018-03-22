import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Client} from '../models/client';
import {BaseApi} from '../core/base-api';
import {Phone} from '../models/phone';
import {ClientPage} from '../models/clients/client-page';


@Injectable()
export class ClientService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getClient(clientId: number): Observable<Client> {
    return this.get(`clients/${clientId}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.post(`clients/`, client);
  }

  refreshClient(client: Client): Observable<Client> {
    console.log(client);
    return this.patch(`clients/${client.id}/`, client);
  }

  getClientByPhone(text: string): Observable<ClientPage> {
    return this.get(`clients?text=${text}`);
  }
}
