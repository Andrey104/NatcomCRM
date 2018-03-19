import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DealMeasurement} from '../models/deal/deal_measurement';
import {HttpClient} from '@angular/common/http';
import {OurComment} from '../models/comment';
import {MeasurementPage} from '../models/measurement/measurement-page';
import {BaseApi} from '../core/base-api';
import {MeasurementResult} from '../models/measurement/measurement-result';

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

  newMeasurement(dealId: number, non_cash: boolean, date: string, time: string): Observable<MeasurementResult> {
    const data = {
      non_cash: non_cash,
      date: date,
      time: time
    };
    return this.post(`deals/${dealId}/measurement/`, data);
  }

  newMount(dealId: number, date: string, description: string) {
    if (date === undefined || date === '') {
      date = null;
    }
    if (description === undefined || description === '') {
      description = null;
    }

    return this.post(`deals/${dealId}/mount/`, {date, description});
  }
}
