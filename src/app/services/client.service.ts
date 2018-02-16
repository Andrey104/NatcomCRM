import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/client';
import {catchError, tap} from 'rxjs/operators';
import {DealResult} from '../models/deal/deal_result';


@Injectable()
export class ClientService {
  private url = 'http://188.225.46.31/api/clients';
  constructor(private http: HttpClient) { }
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(this.url + '/' + id, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }
  token(): string {
    return localStorage.getItem('token');
  }
}
