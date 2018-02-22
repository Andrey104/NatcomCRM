import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DealMeasurement} from '../models/deal/deal_measurement';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MeasurementService {

  constructor(private http: HttpClient) { }
  private url = 'http://188.225.46.31/api/deals/';  // URL to web api
  getMeasurements(id): Observable<DealMeasurement[]> {
    return this.http.get<DealMeasurement[]>(this.url + id + '/measurements', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }
  private token() {
    return localStorage.getItem('token');
  }
}
