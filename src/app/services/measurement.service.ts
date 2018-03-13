import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DealMeasurement} from '../models/deal/deal_measurement';
import {HttpClient} from '@angular/common/http';
import {OurComment} from '../models/comment';
import {MeasurementPage} from '../models/measurement/measurement-page';
import {BaseApi} from '../core/base-api';

@Injectable()
export class MeasurementService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllMeasurements(page: number, status: string): Observable<MeasurementPage> {
    return this.get(`measurements/?page=${page.toString()}&&${status}`);
  }

  getMeasurements(idDeal): Observable<DealMeasurement[]> {
    return this.get(`deals/${idDeal}/measurements/`);
  }

  getMeasurement(idMeasurement): Observable<DealMeasurement> {
    return this.get(`measurements/${idMeasurement}`);
  }

  measurementComment(idMeasurement, comment): Observable<OurComment> {
    return this.post(`measurements/${idMeasurement}/comment/`, {'text': comment});
  }

  getFilterMeasurements(page: number, text: string): Observable<MeasurementPage> {
    return this.get(`measurements/search?page=${page}&&text=${text}`);
  }
}
