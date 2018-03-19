import {Injectable} from '@angular/core';
import {MountStage} from '../models/mount/mount-stage';
import {MountService} from './mount.service';
import {BaseApi} from '../core/base-api';
import {HttpClient} from '@angular/common/http';
import {OurComment} from '../models/comment';
import {Observable} from 'rxjs/Observable';
import {DealPage} from '../models/deal/deals';
import {Cost} from '../models/cost';

@Injectable()
export class StageMountService extends BaseApi {
  stages: MountStage[] = [];

  constructor(private mountService: MountService, public http: HttpClient) {
    super(http);
  }

  putStage(stage: MountStage) {
    this.stages.push(stage);
  }


  resetStages() {
    this.stages = [];
  }

  completeStage(idStage: string): Observable<Object> {
    return this.post(`stages/${idStage}/close/`);
  }

  getStage(id: number): Observable<MountStage> {
    return this.get(`stages/${id.toString()}`);
  }

  addCost(idStage: string, sum: number, comment: string): Observable<Cost> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`stages/${idStage}/cost/`, {sum, comment});
  }

  transferStage(idStage: string, calendar: string, comment: string, cause: number): Observable<Object> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`stages/${idStage}/transfer/`, {new_date: calendar, cause, comment});
  }
}
