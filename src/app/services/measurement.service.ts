import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DealMeasurement} from '../models/deal/deal_measurement';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {OurComment} from '../models/comment';
import {MeasurementPage} from '../models/measurement/measurement-page';

@Injectable()
export class MeasurementService {
  private urlDealMeasurements = 'http://188.225.46.31/api/deals/';  // URL to web api
  private urlMeasurement = 'http://188.225.46.31/api/measurements/';

  constructor(private http: HttpClient) {
  }

  getAllMeasurements(page: number): Observable<MeasurementPage> {
    return this.http.get<MeasurementPage>(this.urlMeasurement, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: new HttpParams().set('page', page.toString())
    });
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
      {'text': comment},
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  getFilterMeasurements(page: number, text: string): Observable<MeasurementPage> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('text', text);
    return this.http.get<MeasurementPage>(this.urlMeasurement + 'search', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: params
    });
  }

  private token() {
    return localStorage.getItem('token');
  }
}
