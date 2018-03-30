import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DealMeasurement} from '../models/deal/deal_measurement';
import {HttpClient} from '@angular/common/http';
import {OurComment} from '../models/comment';
import {MeasurementPage} from '../models/measurement/measurement-page';
import {BaseApi} from '../core/base-api';
import {MeasurementResult} from '../models/measurement/measurement-result';
import {NewMeasurement} from '../models/measurement/new-measurement';

@Injectable()
export class MeasurementService extends BaseApi {
  measurementStatus;

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllMeasurements(page: number, status: string): Observable<MeasurementPage> {
    return this.get(`measurements/?page=${page.toString()}&${status}`);
  }

  getMeasurement(idMeasurement): Observable<DealMeasurement> {
    return this.get(`measurements/${idMeasurement}`);
  }

  measurementComment(idMeasurement, comment): Observable<OurComment> {
    return this.post(`measurements/${idMeasurement}/comment/`, {'text': comment});
  }

  getFilterMeasurements(page: number, text: string): Observable<MeasurementPage> {
    return this.get(`measurements/search?page=${page}&${text}`);
  }

  newMeasurement(dealId: number, measurement: NewMeasurement): Observable<MeasurementResult> {
    return this.post(`deals/${dealId}/measurement/`, measurement);
  }

  editMeasurement(idMeasurement: number, time: string, description: string): Observable<Object> {
    if (description === '') {
      description = null;
    }

    const data = {
      time,
      description
    };
    return this.patch(`measurements/${idMeasurement}/`, data);
  }

  transferMeasurement(idMeasurement: number, cause: number, new_date: string, comment: string): Observable<OurComment> {
    if (comment === '') {
      comment = null;
    }
    const data = {
      cause,
      new_date,
      comment
    };
    return this.post(`measurements/${idMeasurement}/transfer/`, data);
  }

  rejectMeasurement(idMeasurement: number, cause: number, comment: string): Observable<OurComment> {
    if (comment === '') {
      comment = null;
    }
    const data = {
      cause,
      comment
    };
    return this.post(`measurements/${idMeasurement}/reject/`, data);
  }

  reviewRejectMeasurement(idReview: number, cause: number, comment: string): Observable<OurComment> {
    if (comment === '') {
      comment = null;
    }
    const data = {
      cause,
      comment
    };
    return this.post(`rejects/${idReview}/review/`, data);
  }
}
