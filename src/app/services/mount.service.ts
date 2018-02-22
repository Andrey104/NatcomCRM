import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DealMount} from '../models/deal/deal_mount';

@Injectable()
export class MountService {
  private url = 'http://188.225.46.31/api/deals/';

  constructor(private http: HttpClient) { }
  getMounts(id): Observable<DealMount[]> {
    return this.http.get<DealMount[]>(this.url + id + '/mounts', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }
  private token() {
    return localStorage.getItem('token');
  }
}
