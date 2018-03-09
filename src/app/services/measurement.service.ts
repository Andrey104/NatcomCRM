import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DealMeasurement} from '../models/deal/deal_measurement';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {OurComment} from '../models/comment';

@Injectable()
export class MeasurementService {
  private urlDealMeasurements = 'http://188.225.46.31/api/deals/';  // URL to web api
  private urlMeasurement = 'http://188.225.46.31/api/measurements/';

  constructor(private http: HttpClient) {
  }

  getMeasurements(idDeal): Observable<DealMeasurement[]> {
    return this.http.get<DealMeasurement[]>(this.urlDealMeasurements + idDeal + '/measurements', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }

  getMeasurement(idMeasurement): Observable<DealMeasurement> {
    return this.http.get<DealMeasurement>(this.urlMeasurement + idMeasurement, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }

  measurementComment(idMeasurement, comment): Observable<OurComment> {
    return this.http.post<OurComment>(this.urlMeasurement + idMeasurement + '/comment/',
      {'text': comment },
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  private token() {
    return localStorage.getItem('token');
  }
}
